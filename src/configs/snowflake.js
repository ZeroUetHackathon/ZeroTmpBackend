const { Snowflake } = require("nodejs-snowflake");

const snowflake = new Snowflake({
	custom_epoch: new Date("Jan 1 2022").getTime(),
});

/*
 * Generate unique id
 * @return {string} unique id
 */
const getUniqueID = () => snowflake.getUniqueID().toString();

/*
 * Get timestamp from the id
 * @param {string} id - snowflake id
 * @return {number} timestamp
 */
const getTimestampFromID = (id) =>
	Snowflake.timestampFromID(id, snowflake.customEpoch);

module.exports = {
	getUniqueID,
	getTimestampFromID,
};
