'use strict';
const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
        json: true //tells request it's json data, so converts it to an object
    }, (error, response, body) => {
        if (error) {
            callback("Google server connection failed");
        } else if (body.status === "ZERO_RESULTS") {
            callback("Cannot find address entered.");
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: response.body.results[0].geometry.location.lat,
                longitude: response.body.results[0].geometry.location.lng
            })
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;