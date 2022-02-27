const express = require("express");
const app = express();

const routeProducts = require('./routes/products')
const routeRequest = require('./routes/requests')

app.use('/products', routeProducts)
app.use('/requests', routeRequest)
module.exports = app;
