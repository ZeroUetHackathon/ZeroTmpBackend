/* eslint-disable */

const regex = {
	title: /^#\s+.+/,
	heading: /^#+\s+.+/,
	custom: /\$\$\s*\w+/,
	ol: /\d+\.\s+.*/,
	ul: /\*\s+.*/,
	task: /\*\s+\[.]\s+.*/,
	blockQuote: /\>.*/,
	table: /\|.*/,
	image: /\!\[.+\]\(.+\).*/,
	url: /\[.+\]\(.+\).*/,
	codeBlock: /\`{3}\w+.*/,
};

const isTitle = (str) => regex.title.test(str);
const isHeading = (str) => regex.heading.test(str);
const isCustom = (str) => regex.custom.test(str);
const isOl = (str) => regex.ol.test(str);
const isUl = (str) => regex.ul.test(str);
const isTask = (str) => regex.task.test(str);
const isBlockQuote = (str) => regex.blockQuote.test(str);
const isImage = (str) => regex.image.test(str);
const isUrl = (str) => regex.url.test(str);
const isCodeBlock = (str) => regex.codeBlock.test(str);

const getMdShortDesc = (md) => {
	const tokens = md.trim().split("\n");
	const lines = tokens.length;
	for (let i = 0, token = tokens[i]; i < lines; token = tokens[++i]) {
		if (
			isTitle(token) ||
			isHeading(token) ||
			isCustom(token) ||
			isOl(token) ||
			isUl(token) ||
			isTask(token) ||
			isBlockQuote(token) ||
			isImage(token) ||
			isUrl(token) ||
			isCodeBlock(token) ||
			!token.trim()
		)
			continue;
		if (token.length > 150) token = `${token.substr(0, 150)}...`;
		return token;
	}
};

module.exports = getMdShortDesc;
