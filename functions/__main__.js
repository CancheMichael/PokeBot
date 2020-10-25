const send = require('../helpers/send.js');

/**
* Begins a conversation with a specified telephone number
* @param {string} tel The telephone number to initiate messaging with
* @returns {object}
*/
module.exports = (tel, context, callback) => {

	send(
		tel,
		[
			`Thank you for using PokeBot! For a list of commands, type cmd.`
		].join('\n'),
		null,
		(err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null, {status: 'sent', tel: tel});
		}
	);

};
