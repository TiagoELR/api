const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({ message: "Request GET" });
});

router.post("/", (req, res, next) => {
  res.status(201).send({ message: "Request POST" });
});

router.get("/:id", (req, res, next) => {
  res.status(200).send({ message: "Request GET/id: " + req.params.id });
});

router.patch("/", (req, res, next) => {
    res.status(201).send({ message: "Request PATCH" });
});

router.delete("/:id", (req, res, next) => {
    res.status(201).send({ message: "Request DELETE/id: " + req.params.id });
});

module.exports = router;