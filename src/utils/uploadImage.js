const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image) => {
	const result = await cloudinary.uploader.upload(image, {
		resource_type: "image",
		folder: "zero",
	});
	await fs.promises.unlink(image);
	return result;
};

module.exports = uploadImage;
