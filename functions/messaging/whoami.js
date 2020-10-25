/**
* WHOAMI handler, responds if user texts "whoami"
*		(or any uppercase variation like "WHOAMI")
* @param {string} tel The incoming telephone number
* @param {string} body The (text) body of the message
* @param {object} from Information about the incoming message: number, zip, city, state, country
* @param {object} to Information about the receiver (your Twilio number): number, zip, city, state, country
* @returns {string}
*/
module.exports = (tel = '', body = '', from = {}, to = {}, callback) => {

	//Returns a simple message describing the bot
	callback(
		null,
		[
			`You are a Pokemon trainer, and I am your smartphone Pokedex!`,

		].join('\n')
	);

};
