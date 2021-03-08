let request = require('request');

let apiKey = 'e4473bcfd0ace844615e943f70fbb940';
exports.getWeatherByCity = (req,res, next)=>{
    let city = req.body.city;

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`


    request(url, function (err, response, body) {
        if(err){
          console.log('error:', error);
        } else {
          let weather = JSON.parse(body)
          let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.JSON(message)
          console.log(message);
        }
      })
}
