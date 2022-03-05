const { response } = require("express");
const express = require("express");
const router = express.Router();
const RequestController = require("../controllers/request-controller.js");

router.get("/", RequestController.getAllRequests);

router.get("/:id", RequestController.getRequest);

router.post("/", RequestController.postRequest);

router.patch("/", RequestController.patchRequest);

router.delete("/", RequestController.deleteRequest);

module.exports = router;
