const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (image, mimetype) => {
	return cloudinary.uploader.upload(`data:${mimetype};base64,${image}`, {
		resource_type: "image",
		folder: "zero",
	});
};

module.exports = uploadImage;
