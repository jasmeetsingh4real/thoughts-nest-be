import { myDataSource } from "../db/datasource/app-data-source";
import { UsersEntity } from "../entities/user.entity";
import { EnumUserType } from "../types/commonTypes";
import { TLoginDetails, TSignupDetails } from "../zod/userZod";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const genSaltAsync = promisify(bcrypt.genSalt);
const hashAsync = promisify(bcrypt.hash);

export class AuthService {
  private static _encryptPassword = async (password: string) => {
    const salt = await genSaltAsync(10);
    const hash = await hashAsync(password, salt);
    return hash;
  };

  private static _verifyPassword = async (password: string, hash: string) => {
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      throw new Error("Invalid password");
    }
    return match;
  };

  static login = async (
    loginDetails: TLoginDetails
  ): Promise<{
    token: string;
    user: Omit<UsersEntity, "password">;
  }> => {
    const userRepo = myDataSource.getRepository(UsersEntity);
    const userDetails = await userRepo.findOne({
      where: {
        name: loginDetails.userName,
      },
      select: {
        email: true,
        name: true,
        password: true,
        role: true,
      },
    });
    if (!userDetails) {
      throw new Error("User not found");
    }

    await this._verifyPassword(loginDetails.password, userDetails.password);

    delete userDetails.password;

    const authToken = jwt.sign(
      {
        name: userDetails.name,
        role: userDetails.role,
        email: userDetails.email,
      },
      process.env.JWT_TOKEN
    );

    return {
      token: authToken,
      user: userDetails,
    };
  };

  static signup = async (
    signuoDetails: TSignupDetails
  ): Promise<{
    token: string;
    user: Omit<UsersEntity, "password">;
  }> => {
    const userRepo = myDataSource.getRepository(UsersEntity);
    const existingUser = await userRepo.findOne({
      where: {
        name: signuoDetails.name,
      },
    });
    if (existingUser) {
      throw new Error("Username already taken");
    } else {
      const savedDetails = await userRepo.save({
        name: signuoDetails.name,
        password: await this._encryptPassword(signuoDetails.password),
        role: EnumUserType.USER,
      });

      delete savedDetails.password;

      const token = jwt.sign(savedDetails, process.env.JWT_TOKEN);
      return {
        token,
        user: savedDetails,
      };
    }
  };
}
