const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({ message: "Products GET" });
});

router.post("/", (req, res, next) => {
  res.status(201).send({ message: "Products POST" });
});

router.get("/:id", (req, res, next) => {
  res.status(200).send({ message: "Products GET/id: " + req.params.id });
});

router.patch("/", (req, res, next) => {
    res.status(201).send({ message: "Products PATCH" });
});

router.delete("/:id", (req, res, next) => {
    res.status(201).send({ message: "Products DELETE/id: " + req.params.id });
});

module.exports = router;
