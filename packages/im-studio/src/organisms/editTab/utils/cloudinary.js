import Axios from "axios";

const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const key = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const uploadImageToCloudinary = (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", key);

  return Axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );
};

export { uploadImageToCloudinary };
