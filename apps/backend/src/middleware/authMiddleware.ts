import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.body.userId = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
