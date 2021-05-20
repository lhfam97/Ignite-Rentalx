import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementantions/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");
  try {
    // sub eh o user_id
    const { sub: user_id } = verify(
      token,
      "06da7747c389ed2fa550549f1ea32b96"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);
    if (!user) {
      throw new Error("User does not exists!");
    }

    next();
  } catch (err) {
    throw new Error("Invalid token!");
  }
}
