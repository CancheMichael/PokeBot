const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const send = require('../../helpers/send.js');

const COLORS_REGEX = /([Cc]olors) *\w+/g;
const MOVES_REGEX = /([Mm]oves) (\w| )+/g;
const TYPES_REGEX = /([Tt]ypes) (\w| )+/g;

/**
* Not found handler - handles all SMS / MMS that don't match a command
* @param {string} tel The incoming telephone number
* @param {string} body The (text) body of the message
* @param {buffer} media The media content of the message, if any
* @param {object} from Information about the incoming message: number, zip, city, state, country
* @param {object} to Information about the receiver (your Twilio number): number, zip, city, state, country
* @returns {string}
*/
module.exports = (tel = '', body = '', media = null, from = {}, to = {}, context, callback) => {

	if (media) {

		// We got an image!
		return callback(null, `Media is an invalid format.`);

	} else if (body.match(COLORS_REGEX)) {

		// We matched some regex
		//Send message information to matching function
		//Then wait for return from matching function
		let matches = new RegExp(COLORS_REGEX).exec(body);
		let item = matches[1].toLowerCase();
		if (item === 'colors') {
			lib[`${context.service.identifier}.messaging.colors`]({
				tel: from.number,
				body: body,
				from: from,
				to: to
			}, (err, result) => {
				return callback(err, result);
			});

		} else {
			return callback(null, `Invalid Input`);
		}

	}
	else if (body.match(MOVES_REGEX)) {

		// We matched some regex
		let matches = new RegExp(MOVES_REGEX).exec(body);
		let item = matches[1].toLowerCase();
		if (item === 'moves') {
			lib[`${context.service.identifier}.messaging.moves`]({
				tel: from.number,
				body: body,
				from: from,
				to: to
			}, (err, result) => {
				return callback(err, result);
			});

		} else {
			return callback(null, `Invalid Input`);
		}

	}
	else if (body.match(TYPES_REGEX)) {

		// We matched some regex
		let matches = new RegExp(TYPES_REGEX).exec(body);
		let item = matches[1].toLowerCase();
		if (item === 'types') {
			lib[`${context.service.identifier}.messaging.types`]({
				tel: from.number,
				body: body,
				from: from,
				to: to
			}, (err, result) => {
				return callback(err, result);
			});

		} else {
			return callback(null, `Invalid Input`);
		}

	}
	else {

		// We didn't find a command or match anything
		return callback(
			null,
			`Please type cmd for a list of valid commands`
		);

	}

};
