import errorHandler from "../utils/custom.error.handler.js";
import Certificate from "../models/certificate.model.js";

export const createCertificate = async (req, res, next) => {

    try {
        const certificate = await Certificate.create(req.body);
        return res.status(201).json(certificate);
    } catch (error) {
        next(error);
    }

}

export const deleteCertificate = async (req, res, next) => {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
        return next(errorHandler(404, "Certificate not found!"));
    }
    try {
        await Certificate.findByIdAndDelete(req.params.id);
        res.status(200).json("Certificate has been deleted!");
    } catch (error) {
        next(error);
    }
};


export const getCertificates = async (req, res, next) => {
    try {
        const certificates = await Certificate.find({});
        if (!certificates) {
            return next(errorHandler(404, "No certificates found!"));
        }
        res.status(200).json(certificates);
    } catch (error) {
        next(error);
    }

}