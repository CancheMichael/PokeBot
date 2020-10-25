const COLORS_REGEX = /([Cc]olors) *\w+/g;
const send = require('../../helpers/send.js');
const fetch = require("node-fetch");

  /**
  * colors handler, responds if user texts "colors [pokemon_species]"
  *		(or any uppercase variation like "WHOAMI")
  * @param {string} tel The incoming telephone number
  * @param {string} body The (text) body of the message
  * @param {object} from Information about the incoming message: number, zip, city, state, country
  * @param {object} to Information about the receiver (your Twilio number): number, zip, city, state, country
  * @returns {string}
  */
  module.exports = (tel = '', body = '', from = {}, to = {}, callback) => {
    matches = new RegExp(COLORS_REGEX).exec(body);
    color = matches[0].toLowerCase().split(" ")[1];
    mssg = '';
    //Returns a random pokemon based off a color
    fetch('https://pokeapi.co/api/v2/pokemon-color/' + color,
    {
        method: 'GET'})

    	.then((response) => {
    	return response.json()
    	})
    	.then((data) => {
    	// Work with JSON data here
      x = Math.floor(Math.random() * data.pokemon_species.length)
      mssg = data.pokemon_species[x].name
      mssg = mssg.charAt(0).toUpperCase() + mssg.slice(1)

      return callback(null, mssg);
    	})
    	.catch((err) => {
    	// Do something for an error here
        return callback('Invalid Pokemon', null);

    	})



  };
