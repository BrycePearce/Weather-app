const request = require('request');
require('dotenv').config()

var getWeather = (lat, lng, callback) => {
    request({
        url: 'https://api.darksky.net/forecast/' + process.env.API_KEY + '/' + lat + ',' + lng,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback(body.currently.temperature);
        } else {
            callback("There was a problem finding the weather.");
        }
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
    });
};

module.exports.getWeather = getWeather;