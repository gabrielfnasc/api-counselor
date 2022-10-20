import { NextFunction, Response, Request } from "express";

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set("access-control-allow-origin", "*");
  res.set("access-control-allow-headers,", "*");
  res.set("access-control-allow-origins,", "*");

  next();
};