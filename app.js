const express = require('express');
const bodyParser = require('body-parser');
const _ = require("lodash");;

const app = express();
const events = [];

const state = ["Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry"]

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { foo: 'FOO' });
});

app.get('/sell', (req, res) => {
  res.render('sell', { states: state });
});

app.get('/browse', (req, res) => {
  res.render('browse', {
    eventsArray: events,
  })
})

app.post('/sell', (req, res) => {
  const event = {
    fName: req.body.fName + " " + req.body.lName,
    lName: req.body.lName,
    eventName: req.body.eventName,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    eventDetails: req.body.eventDescription,
    ticketDetais: req.body.ticketDescription,
    price: req.body.price,
    quantity: req.body.quantity,
    eventDate: req.body.date
  }
  events.push(event);
  res.redirect("/");
});

app.get("/events/:eventName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.eventName);
  events.forEach((event) => {
    const storedTitle = _.lowerCase(event.eventName);

    if (storedTitle === requestedTitle) {
      res.render('events', event);
    }
  });
});

app.listen(3000, () => console.log('App listening on port 3000'));