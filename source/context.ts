import jwt from "jsonwebtoken";
import config from "./config";
import { Request, Response } from "express";

export class Context {
  token = "";
  userId = "";

  constructor(request: Request, response: Response) {
    const authorization = request.headers.authorization ?? null;
    if (authorization && authorization.startsWith("Bearer ")) {
      this.token = authorization.slice(7, authorization.length);
    }
  }

  authorized(): boolean {
    const decoded = this.token
      ? jwt.verify(this.token, config.tokenSecret)
      : false;

    return Boolean(decoded);
  }

  getUserId(): string {
    if (this.token) {
      const decoded = jwt.decode(this.token, { json: true });

      if (decoded?.userId) {
        return decoded.userId;
      }
    }

    throw new Error("User id not found in token");
  }
}

type TExpressContext = {
  req: Request;
  res: Response;
};

export default function createContext(
  expressContext: TExpressContext
): Context {
  return new Context(expressContext.req, expressContext.res);
}
