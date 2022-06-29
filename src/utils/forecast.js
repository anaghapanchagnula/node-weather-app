const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const forecastURL =
    'http://api.weatherstack.com/current?access_key=4d5b82017922c525d6e96b32b38c02cf&query=' +
    latitude +
    ',' +
    longitude +
    '&units=f';

  request({ url: forecastURL, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
