import errorHandler from "./custom.error.handler.js";
import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(
      errorHandler(401, "Unauthorized! Check your token and try again.")
    );
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
      if (err) {
        next(errorHandler(401, "Forbidden!"));
      } else {
        req.admin = admin;
        
        next();
      }
    });
  }
};
