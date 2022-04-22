const status = require("http-status");
const { Province, Wiki } = require("#models");
const { uploadImage, getMdShortDesc } = require("#utils");

const editProvinceWiki = async (request, reply) => {
	const wiki = {
		wiki: request.body.wiki,
	};
	if (request.body.files) {
		wiki.attachments = await Promise.all(
			request.body.files.map(async (file) => {
				const result = await uploadImage(
					Buffer.from(file.data).toString("base64"),
					file.mimetype
				);
				return result.secure_url;
			})
		);
	}
	const newWiki = await Wiki.create(wiki);
	await Province.findByIdAndUpdate(
		request.params.provinceId,
		{
			shortDescription: getMdShortDesc(newWiki.wiki),
		},
		{ new: true }
	);
	return reply.code(status.OK).send({ message: "Thành công!" });
};

module.exports = {
	editProvinceWiki,
};
