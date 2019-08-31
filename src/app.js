const path= require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express() 

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Tracy'
    })
})
app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Tracy'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help',
        message: 'this is a help session ',
        name: 'Tracy'
  
    })
})

app.get('/weather', (req,res)=> {

    if (!req.query.address){
        return res.send ({
            error: 'Please enter an address!'
        })
    }
        geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address 
                })
                
            })
        })
    })

    /*
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address for the search!'
        })
    }
    
    res.send({
        address: req.query.address,
        foreast: "Some forecast",
        location: "Some location"
    })
})
*/ 

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search item!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=> {
    res.render('404', {
        title: 'My 404 Page',
        message: 'Help article not found ',
        name: 'Tracy'
    })
})

app.get('*', (req,res)=> {
    res.render('404', {
        title: 'My 404 Page',
        message: 'Page not found',
        name: 'Tracy'
    })
})

app.listen(3000, ()=> {
    console.log('Server is up and running at port 3000!')
}) 