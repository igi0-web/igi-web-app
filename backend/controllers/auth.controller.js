import bcrypt from "bcryptjs";
import errorHandler from "../utils/custom.error.handler.js";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/admin.model.js";


export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validAdmin = await Admin.findOne({ email });
      if (!validAdmin) {
        return next(errorHandler(404, "Admin not found!"));
      }  else {
          const validPassword = await bcrypt.compare(
            password,
            validAdmin.password
          );
          if (!validPassword) {
            return next(errorHandler(401, "Invalid Password!"));
          } else {
            generateToken(res, validAdmin);
          }
        }
      }
     catch (error) {
      next(error);
    }
}


export const signOut = (req, res, next) => {
    try {
      res.clearCookie("jwt").status(200).json("Signed out successfully!");
    } catch (error) {
      next(error);
    }
  };