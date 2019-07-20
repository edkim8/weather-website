const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3300;

// Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Edward Kim'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Edward Kim'
  });
});

app.get('/Help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'This is a page that list the helpful notes.',
    name: 'Edward Kim'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: req.query.address,
          location: location,
          forecast: forecastData
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404',
    message: 'Help article is not found',
    name: 'Edward Kim'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page not Found',
    message: 'This page does not exist!',
    name: 'Edward Kim'
  });
});

app.listen(port, () => {
  console.log(`Serve is up on port: ${port}.`);
});
