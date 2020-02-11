const path = require('path');
const express = require('express');
const hbs = require('hbs');


const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log('dirname: ',__dirname);
// console.log('filename: ',path.join(__dirname, '../public/index.html'));

const app = express();
const port = process.env.PORT || 3000;
/* Define paths for Express config */
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/* Setup handlebars engine and views location */
app.set('view engine', 'hbs' );
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

/* Setup static directory to server */
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Parus'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Parus'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'We are here to help',
    title: 'Help',
    name: 'Parus'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } 
  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

// app.get('/weather', (req, res) => {
//   const { address } = req.query;
//   if(!address) {
//     return res.send({
//       error: 'You must provide an address'
//     });
    
//   }
//   geocode(address , (error, {latitude, longitude, location} = {} ) => {
//     if(error) {
//       return res.send({error});
//     }
//     forecast(latitude, longitude, (error, forecastData) => {
//       if(error) {
//         return res.send({ error });
//       }
//       res.send({
//         forecast: forecastData,
//         location,
//         address
//       })
//     })
//   })
  
// });

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search);
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Parus',
    errorMessage: 'Article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Parus',
    errorMessage: 'Page not found' 
  });
})


app.listen(port, () => {
  console.log('Server is up on port 3000');
});