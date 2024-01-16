import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import hbs from 'hbs'

import geocode from '../utils/geocode.js'
import forecast from '../utils/forecast.js'

const app = express()
const port = process.env.PORT

//Define paths for Express config
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')
// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

//  well never run because of app.use()
// app.get('', (req, res) => {
//     res.send('Hello, Express!')
// })

// for index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Khaled'
    })
})

// for about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Khaled'
    })
})

// for help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Khaled",
        message: "Help message"
    })
})


// weather route
app.get('/weather', (req, res) => {
    // check is user provide address
    if (!req.query.address) {
        return res.send({
            error: "You should provide address term"
        })
    }
    // dealing with forcast and geocode functions

    geocode(req.query.address, (error, data) => {
        // this approach also could be used but we should pass default value(ex. empty object) to avoid errors
        // geocode(req.query.address, (error, {lat, lon, location} = {}) => { 
        if (error) {
            return res.send({ error })
        }
        const { lat, lon, location } = data

        forecast(lat, lon, (error, data) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                ...data,
                location
            })
        })
    })

    // res.send({
    //     location: req.query.address,
    //     temperature: 27,
    //     human_feel: 25.7
    // })
})

//handle 404 (not found error) for help route
app.get('/help/*', (req, res) => {
    res.render('404-help', {
        title: "404 help",
        name: "Khaled",
        message: "Help article not found.",

    })
})

// handle 404 (not found error) for all routes
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Khaled",
        message: "Page not found.",

    })
})
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
})

