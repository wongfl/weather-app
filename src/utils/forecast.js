const request = require('request')

const forecast = (lat,lng, callback) => {
    const url = 'https://api.darksky.net/forecast/7dada210a802f6e3c72bdebe4827f1c0/' + lat +',' + lng +'?units=si'

    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +" It is currently " + body.currently.temperature +
                 " degrees celsius out. There is a " + body.currently.precipProbability + "% chance of rain." )

        }
    })
} 

module.exports = forecast

/*
request({url: url, json: true}, (error, response) => {
    if (error) {
        console.log("Unable to connect to weather service!")
    } else if (response.body.error) {
        console.log("Unable to find location")
    } else {
        const summary = response.body.daily.data[0].summary
        const temperature = response.body.currently.temperature
        const precipProbability = response.body.currently.precipProbability
        const precipType = response.body.currently.precipType
        console.log(summary +" It is currently " + temperature + " degrees celsius out. There is a " + precipProbability + 
        "% chance of " + precipType + "." )
    }
       
})
*/ 