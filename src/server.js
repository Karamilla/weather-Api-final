const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// define paths for express config
const publicDriectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static  directory serve
app.use(express.static(publicDriectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "mohammed mustafa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "mohammed",
    about: "udacity work",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Some thing wrong",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Some thing wrong",
  });
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
