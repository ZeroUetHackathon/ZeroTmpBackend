const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image) => {
	return cloudinary.uploader.upload(image, {
		resource_type: "image",
		folder: "zero",
	});
};

module.exports = uploadImage;
