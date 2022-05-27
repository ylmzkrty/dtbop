import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, "secretKey");
    next();
  } catch (e) {
    return res
      .status(401)
      .redirect(
        "/login?error=baduserlogin&message=Girişte bir sorun yaşandı. Lütfen tekrar giriş yapınız."
      );
  }
};

export default checkAuth;
