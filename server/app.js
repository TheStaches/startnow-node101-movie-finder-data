const express = require('express');
const axios = require("axios");
const morgan = require("morgan");
const apiKey = "8730e0e";
let movie = '';
let jsonData = {};

const app = express();

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.use(morgan("dev"));
 
app.get("/", function(req, res) {
    
    //Get movie query from client
    for (item in req.query) {
        if (Object.keys(req.query) == "i") {
            movie = ("i=" + req.query.i);
        } else {
            movie = ("t=" + req.query.t).replace(" ", "%20");
        }
    }
    
    // API Call
    if (!(movie in jsonData)) {
    axios.get("http://www.omdbapi.com/?" + movie + "&apikey=" + apiKey)
        .then(function(response) {
            jsonData[movie] = response.data;
            res.send(response.data);     
        })
        .catch(function(err) {
            console.log(err.message);
        });
    } else {
        res.send(jsonData[movie]);
    }
});

module.exports = app;
