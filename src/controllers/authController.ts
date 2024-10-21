import { AuthService } from "../services/authService";
import { emptyResponse } from "../utils";
import { loginDetailsSchema, signupDetailsSchema } from "../zod/userZod";

export class AuthController {
  static login = async (req, res) => {
    const jsonResponse = emptyResponse();
    try {
      const validatedDetails = loginDetailsSchema.safeParse(req.body);
      if (!validatedDetails.success) {
        throw new Error(`Invalid login details`);
      }
      const loginRes = await AuthService.login(validatedDetails.data);
      jsonResponse.result = "Login successful";
      res.cookie("authToken", loginRes.token, { expiresIn: "4h" });
    } catch (error) {
      jsonResponse.errorMessage = error.message || "Something went wrong";
      jsonResponse.success = false;
    }

    return res.json(jsonResponse);
  };

  static signup = async (req, res) => {
    const jsonResponse = emptyResponse();
    try {
      // TODO: Implement signup logic here
      const validatedDetails = signupDetailsSchema.safeParse(req.body);
      if (!validatedDetails.success) {
        throw new Error(`Invalid signup details`);
      }

      const signupRes = await AuthService.signup(validatedDetails.data);
      res.cookie("authToken", signupRes.token, { expiresIn: "4h" });

      jsonResponse.result = "Signup successful";
      // Set your cookie here
    } catch (error) {
      jsonResponse.errorMessage = error.message || "Something went wrong";
      jsonResponse.success = false;
    }
    return res.json(jsonResponse);
  };
}
