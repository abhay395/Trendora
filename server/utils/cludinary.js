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
      throw new Error("No file provided");
    }
    const result = await new Promise((resolve, reject) => {
      // Check if the file is an image
      const mimeType = file.mimetype;
      // if (!mimeType.startsWith(type)) {
      //   reject({ error: `Only ${type} uploads are allowed.` });
      // }

      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            reject({ error: "Cloudinary upload failed" });
          } else {
            resolve(result);
          }
        })
        .end(file.buffer);
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Cloudinary upload failed: " + error.message);
  }
};

export default uploadToCloudinary;
