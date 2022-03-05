const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user-controller')

router.post("/", UserController.postUser);

router.post("/login", UserController.userLogin);

module.exports = router;
