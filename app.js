const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const routeProducts = require("./routes/products");
const routeRequest = require("./routes/requests");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
