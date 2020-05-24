const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=983523b3fa72d7b27081eed6d9f061f1&query=" 
    ${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather service");
    } else if (body.error) {
      callback("unable to find location");
    } else {
      callback(
        undefined,
        ` ${body.current.weather_descriptions} througout the day . it's feels like ${body.current.feelslike} degrees `
      );
    }
  });
};

module.exports = forecast;
