// const request = require('request');
// const forecast = (longitude, latitude, callback) => {
//   const url = `https://api.darksky.net/forecast/ad7a52b9d61323a2fb994247a9c0bbf8/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}?units=si`;

//   request({url, json: true}, (error, { body } = {}) => {
//     const { summary } = body.daily.data[0] 
//     const { temperature, precipProbability } = body.currently;
//     if(error) {
//       callback('Unable to connect to weather services!', undefined) ;
//     } else if(body.error) {
//       callback('Unable to find location', undefined);
//     } else {
//       callback(undefined, `${summary} It is currently ${temperature} degrees out . There is a ${precipProbability}% chance of rain`);
//     }
//   })
// };

// module.exports = forecast;

const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/ad7a52b9d61323a2fb994247a9c0bbf8/'+longitude+','+latitude
  request ({url, json: true}, (error, {body} = {}) => {
    if(error) {
      callback('Unable to connect ot weather service!', undefined);
    } else if(body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast;