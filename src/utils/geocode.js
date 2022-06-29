const request = require('request');

const geocode = (address, callback) => {
  const url =
    'http://api.positionstack.com/v1/forward?access_key=99ae35e4c92297b60fcf78e38beae4ac&query=' +
    encodeURIComponent(address) +
    '&limit=1';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (!response.body.data || response.body.data.length === 0) {
      callback('Unable to find matching results!', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        placeName:
          response.body.data[0].name +
          ', ' +
          response.body.data[0].region +
          ', ' +
          response.body.data[0].country,
      });
    }
  });
};

module.exports = geocode;
