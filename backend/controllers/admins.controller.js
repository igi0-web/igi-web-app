import bcrypt from "bcryptjs";
import errorHandler from "../utils/custom.error.handler.js";
import Admin from "../models/admin.model.js";
import validator from "validator";


export const createAdmin = async (req, res, next) => {
    if (req.admin && req.admin.id != req.params.adminId) {
        return next(errorHandler(401, "You can only create admins from your own account!"));
    }
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


export const getAdmins = async (req, res, next) => {
    try {
        if (req.admin && req.admin.id != req.params.adminId) {
            return next(errorHandler(401, "You can only update your own account!"));
        }
        const admins = await Admin.find({});
        if (admins.length == 0) {
            return next(errorHandler(404, "No admins found!"));
        }
        res.status(200).json(admins);
    } catch (error) {
        next(error);
    }

}


export const deleteAdmin = async (req, res, next) => {
    if (req.admin && req.admin.id != req.params.adminId) {
        return next(errorHandler(401, "You can only delete admins from your own account!"));
    }
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
        return next(errorHandler(404, "Admin not found!"));
    }
    try {
        if (admin.super == false) {
            await Admin.findByIdAndDelete(req.params.id);
            res.status(200).json("Admin has been deleted!");
        } else {
            return next(errorHandler(400, "You can't delete super admins!"));
        }

    } catch (error) {
        next(error);
    }
};


export const editAdmin = async (req, res, next) => {
    if (req.admin && req.admin.id != req.params.adminId) {
        return next(errorHandler(401, "You can only update your own account!"));
    }
    const admin = await Admin.findById(req.params.adminId);
    if (!admin) {
        return next(errorHandler(404, "Admin not found!"));
    }
    try {
        let hashedBody;
        if (req.body.password != "" && req.body.password != null) {
             hashedBody = {
                ...req.body,
                password: await bcrypt.hash(req.body.password, 10)
            }
        } else {
            hashedBody = {
                ...req.body,
                password: admin.password
            }
            
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.adminId,
            hashedBody,
            { new: true }
        );
        res.status(200).json(updatedAdmin);
    } catch (error) {
        next(error);
    }
};