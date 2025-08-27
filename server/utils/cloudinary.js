import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";
import ApiError from "./ApiError.js";

const uploadToCloudinary = async ({
    file,
    folder = "uploads",
    resource_type = "auto",
}) => {
    try {
        if (!file) {
            throw new ApiError("No file provided");
        }
        let result;
        if (file?.buffer) {
            result = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ resource_type: "image", quality: "auto", fetch_format: "auto" }, (error, result) => {
                        if (error) {
                            reject({ error: "Cloudinary upload failed" });
                        } else {
                            resolve(result);
                        }
                    })
                    .end(file.buffer);
            });
        } else if (file?.path) {
            result = await cloudinary.uploader.upload(file.path, {
                folder,
                resource_type
            })
            fs.unlinkSync(file.path)
        }
        return result;
    } catch (error) {
        throw new ApiError(400, "Cloudinary upload failed: " + error.message);
    }
};

export default uploadToCloudinary;
