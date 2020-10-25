const TYPES_REGEX = /([Tt]ypes) (\w| )+/g;
const send = require('../../helpers/send.js');
const fetch = require("node-fetch");

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
    matches = new RegExp(TYPES_REGEX).exec(body);
    matchLower =  matches[0].toLowerCase();
    pokemon = matchLower.substr(matchLower.indexOf(' ')+1).replace(/\s/g, '-');
    mssg = '';
    //Returns the type of the Pokemon
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon,
    {
        method: 'GET'})

    	.then((response) => {
    	return response.json()
    	})
    	.then((data) => {
    	// Work with JSON data here'
      mssg += pokemon + ' is a '
      //Adds a slash for Pokemon that are multi-typed
      for (index = 0; index < data.types.length; index++) {
        mssg += data.types[index].type.name + '/'
      }
      mssg = mssg.slice(0, -1);
      mssg += ' type.'
      mssg = mssg.charAt(0).toUpperCase() + mssg.slice(1)
      return callback(null, mssg);
    	})
    	.catch((err) => {
    	// Do something for an error here
      return callback('Invalid Pokemon', null);

    	})



  };
