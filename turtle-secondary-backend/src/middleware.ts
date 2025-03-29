import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export function autherize(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization");
    console.log("hi bro ")
    console.log(token);
    const actualToken = token?.split(" ")[1];
    if (!token || !actualToken) return;
    const decoded = jwt.verify(actualToken, JWT_SECRET, {
      algorithms: ["RS256"]
    });
    if (!decoded) {
      res.json({ msg: "unauthorized" });
      return;
    }
    const userId = (decoded as any).sub
    if (!userId) {
      res.json({ "msg": "unauthorized" });
      return;
    }
    req.userId = userId;
    next()
  } catch (err) {
    console.log(err);
    res.json({
      msg: "invalid authentication "
    })
  }
}
