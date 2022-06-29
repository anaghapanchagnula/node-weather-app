const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
//static means that these webpages will not change no matter how many times you refresh

//HOME PAGE
app.get('', (req, res) => {
  res.render('index', {
    title: 'Current Weather Forecast',
    name: 'Anagha Panchagnula',
  });
});

//HELP PAGE
app.get('/help', (req, res) => {
  res.render('help', {
    message:
      'Input a valid address, city, or other location in the search form on the Weather page to see the current weather forecast!',
    title: 'Help',
    name: 'Anagha Panchagnula',
  });
});

//WEATHER PAGE
app.get('/weather', (req, res) => {
  geocode(
    req.query.address,
    (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          address: req.query.address,
          location: placeName,
          forecast: forecastData,
        });
      });
    }
  );
});

//PRODUCTS PAGE
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//ERRORS
app.get('/help/*', (req, res) => {
  res.render('404-page', {
    title: 'Error: 404',
    errorMessage: 'Help article not found',
    name: 'Anagha Panchagnula',
  });
});

app.get('*', (req, res) => {
  res.render('404-page', {
    title: 'Error: 404',
    errorMessage: 'Page not found',
    name: 'Anagha Panchagnula',
  });
});

//RENDER
app.listen(port, () => {
  console.log('Server is up on port ' + port) + '.';
});
