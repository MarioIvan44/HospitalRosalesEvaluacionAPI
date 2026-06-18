import multer from "multer"
import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"

import { config } from "../../config.js"

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Evaluacion",
        resource_type: "auto",
        allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    }
});

const parser = multer ({storage});

export default parser;