const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geo = require('./geocode');
const forecast = require('./forecast');

const app = express();
const port = process.env.PORT||3000;  // to add heroku port
const viewsPAth = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '../templates/partials')
//

// set up handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPAth);
hbs.registerPartials(partialsPath);


//setup static directory to serve
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));


//Set up dynamic directory to serve
app.get('', (req, res) => {
    res.render('index');
})



//weather page
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send('No Location was found');
    }
    geo(req.query.location, (err, data) => {
        console.log(data);
        forecast(data, (err, weather) => {
            console.log(weather);
            res.send( {
                location: req.query.location,
                coordinates: data,
                weather: weather
            });
        })
    })
})
app.get('/weatherAutoLocate', (req, res) => {
    console.log(req.query.lat,req.query.long)
    if (!req.query.lat) {
        return res.send('No Location was found');
    }
    data={lat:req.query.lat,long:req.query.long}
    
        forecast({lat:req.query.lat,long:req.query.long}, (err, weather) => {
            console.log(weather);
            res.send( {
                location: req.query.location,
                coordinates: data,
                weather: weather
            });
        })
    
})
//404  not found page
app.get('*', (req, res) => {
    res.render('404', {
        name: 'hayouni',
        age: 28
    });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

