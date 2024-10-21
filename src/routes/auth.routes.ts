import { AuthController } from "../controllers/authController";

const express = require("express");
export const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/signup", AuthController.signup);
