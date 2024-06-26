import errorHandler from "../utils/custom.error.handler.js";
import Certificate from "../models/certificate.model.js";
import { generateBlurHashFromImageUrl } from "../utils/imagesFunctions.js";

export const createCertificate = async (req, res, next) => {

    try {
        if (req.admin && req.admin.id != req.params.adminId) {
            return next(errorHandler(401, "You can only create projects from your own account!"));
        }
        const { imageUrl } = req.body;
        const imageBlur = await generateBlurHashFromImageUrl(imageUrl);
        const certificate = await Certificate.create({
            ...req.body,
            blurhash: imageBlur
        });
        return res.status(201).json(certificate);
    } catch (error) {
        next(error);
    }

}

export const deleteCertificate = async (req, res, next) => {
    if (req.admin && req.admin.id != req.params.adminId) {
        return next(errorHandler(401, "You can only create projects from your own account!"));
    }
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
        const limit = parseInt(req.query.limit) || null;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const certificates = await Certificate.find({}).sort({ createdAt: -1 }).limit(limit)
            .skip(startIndex);
        if (certificates.length == 0) {
            return next(errorHandler(404, "No certificates found!"));
        }
        res.status(200).json(certificates);
    } catch (error) {
        next(error);
    }

}


export const getCertificateById = async (req, res, next) => {
    try {
        const cer = await Certificate.findById(req.params.id);
        if (!cer) {
            return next(errorHandler(404, "Certificate not found!"));
        }

        res.status(200).json(cer);
    } catch (error) {
        next(error);
    }
};