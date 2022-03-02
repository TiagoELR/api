const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const routeProducts = require("./routes/products");
const routeRequest = require("./routes/requests");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).send({})
  }
  next();
});

app.use("/products", routeProducts);
app.use("/requests", routeRequest);
app.use((req, res, next) => {
  const erro = new Error("Não encontrado!");
  erro.status = 404;
  next(erro);
});
app.use((erro, req, res, next) => {
  res.status(erro.status || 500);
  return res.send({ error: { message: erro.message } });
});
module.exports = app;
