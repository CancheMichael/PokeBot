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

	//Returns a list of valid commands
	callback(
		null,
		[
			`Hi! I'm RotomDex, here to help find information about Pokemon!` +
			'\nEnter Moves name to get a description of the move.'
			+
		 '\nEnter Colors color to get a random Pokemon of that color.'
		 +
		'\nEnter Types pokemon to get the types of the Pokemon.'
		].join('\n')
	);

};
