import { myDataSource } from "../db/datasource/app-data-source";
import { DailyNotesEntity } from "../entities/dailyNotes.entity";
import { emptyResponse } from "../utils";
import { dailyNoteSchema } from "../zod/userZod";

export class UserController {
  static saveNote = async (req, res) => {
    const jsonResponse = emptyResponse();

    try {
      const validatedData = dailyNoteSchema.safeParse(req.body);
      if (!validatedData.success) {
        throw new Error("Invalid data");
      }
      const notesRepo = myDataSource.getRepository(DailyNotesEntity);
      await notesRepo.save({ ...validatedData.data, userId: "test" });
      jsonResponse.result = "saved";
    } catch (error: any) {
      jsonResponse.success = false;
      jsonResponse.errorMessage = error.message || "Something went wrong";
    }

    return res.json(jsonResponse);
  };

  static getUserNotes = async (req, res) => {
    const jsonResponse = emptyResponse();
    try {
      const notesRepo = myDataSource.getRepository(DailyNotesEntity);
      const notes = await notesRepo.find({ where: { userId: "test" } });
      jsonResponse.result = notes;
    } catch (error: any) {
      jsonResponse.success = false;
      jsonResponse.errorMessage = error.message || "Something went wrong";
    }
    return res.json(jsonResponse);
  };
}
