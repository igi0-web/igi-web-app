import bcrypt from "bcryptjs";
import errorHandler from "../utils/custom.error.handler.js";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/admin.model.js";
import validator from "validator";

export const signUpAnAdmin = async (req, res, next) => {
    const { name, email, password, phone } = req.body;

    if (!email || !password || !name || !phone) {
        next(errorHandler(401, "Fields must be filled!"));
    } else if (!validator.isEmail(String(email))) {
        next(errorHandler(401, "Your email is not valid!"));
    } else if (!validator.isStrongPassword(String(password))) {
        next(
            errorHandler(
                401,
                "Your password is not valid! It should be at least 8 characters, containing capital letter, small letter, number and a symbol."
            )
        );
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = new Admin({
                name,
                email,
                phone,
                password: hashedPassword,
            });
            const admin = await newAdmin.save();
            res
                .status(201)
                .json(
                    "Admin account was created successfully!"
                );


        } catch (error) {
            next(error);
        }
    }
}


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