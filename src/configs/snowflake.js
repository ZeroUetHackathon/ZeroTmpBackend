const { Snowflake } = require("nodejs-snowflake");

const snowflake = new Snowflake({
	// custom_epoch: new Date("Jan 1 2022").getTime(),
	custom_epoch: new Date("2014-10-01").getTime(),
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
	Snowflake.timestampFromID(id, snowflake.customEpoch());

/*
 * Get an id from a timestamp
 * @param {number} timestamp
 * @return {BigInt} id
 */
const idFromTimestamp = (timestamp) => snowflake.idFromTimestamp(timestamp);

module.exports = {
	getUniqueID,
	getTimestampFromID,
	idFromTimestamp,
};
