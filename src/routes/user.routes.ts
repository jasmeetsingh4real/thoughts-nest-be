import { UserController } from "../controllers/userController";

const express = require("express");
export const userRouter = express.Router();

userRouter.post("/saveNote", UserController.saveNote);
userRouter.post("/getUserNotes", UserController.getUserNotes);
