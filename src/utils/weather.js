request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/d0242576a362772b2712d66174d5b2bc/${lat},${long}?exclude=[minutely,hourly]`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(
        undefined,
        `${response.body.daily.data[0].summary} It is currently ${
          response.body.currently.temperature
        } degrees out.  There is a ${
          response.body.currently.precipProbability
        }% chance of rain.`
      );
    }
  });
};
module.exports = forecast;
