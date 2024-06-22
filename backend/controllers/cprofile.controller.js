import CProfile from "../models/cprofile.model.js";
import errorHandler from "../utils/custom.error.handler.js";

export const getCompanyProfile = async (req, res) => {
    try {
        const cprofile = await CProfile.findOne({});
        res.status(200).json(cprofile);
    } catch (error) {
        next(errorHandler(404, "Resource Not Found!"));
    }

}

export const editCompanyProfile = async (req, res, next) => {
    try {
        if (req.admin && req.admin.id != req.params.adminId) {
            return next(errorHandler(401, "You can only update the company profile from your own account!"));
        }
        const { phoneNumber, email, location, Address, facebook, linkedin, instagram } = req.body;
        const cprofile = await CProfile.findOne({});
        if (cprofile) {
            cprofile.phoneNumber = phoneNumber;
            cprofile.email = email;
            cprofile.location = location;
            cprofile.Address = Address;
            cprofile.facebook = facebook;
            cprofile.linkedin = linkedin;
            cprofile.instagram = instagram;
            const updatedCprofile = await cprofile.save();
            res.status(200).json("Updated Successfully!");
        }
    } catch (error) {
        next(errorHandler(404, "Resource Not Found!"));
    }

}


