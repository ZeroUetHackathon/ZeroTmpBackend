module.exports = {
	addAttachmentsToWikiPlaceholder: [
		{
			// lookup to get province
			$lookup: {
				from: "provinces",
				localField: "provinceId",
				foreignField: "_id",
				as: "province",
			},
		},
		{ $unwind: "$province" },
		// set province to province name
		{ $set: { province: "$province.name" } },
		// lookup to get the wiki
		{
			$lookup: {
				from: "wikis",
				localField: "wikiId",
				foreignField: "_id",
				// split the placeholders into an array
				pipeline: [
					{ $project: { wiki: { $split: ["$wiki", "{}"] }, attachments: 1 } },
				],
				as: "wiki",
			},
		},
		// remove array bracket
		{ $unwind: "$wiki" },
		// add attachments into wiki placeholder {}
		{
			$set: {
				wiki: {
					$reduce: {
						input: {
							// make an array of indexes of wiki attachments
							$range: [0, { $size: "$wiki.attachments" }],
						},
						initialValue: "",
						in: {
							// concat the attachments into placeholders
							$concat: [
								// this value first (initialValue)
								"$$value",
								// then wiki
								{ $arrayElemAt: ["$wiki.wiki", "$$this"] },
								// then attachments
								{ $arrayElemAt: ["$wiki.attachments", "$$this"] },
								// check if already added all attachments, add the remaining close parenthesis
								{
									$cond: [
										{
											$eq: [
												"$$this",
												{ $subtract: [{ $size: "$wiki.attachments" }, 1] },
											],
										},
										")",
										"",
									],
								},
							],
						},
					},
				},
			},
		},
	],
};
