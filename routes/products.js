const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ProductController = require("../controllers/product-controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Math.random().toString().substring(3) + file.originalname);
  }
});
const fileFilterByMime = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilterByMime
});

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProduct);

router.post(
  "/",
  auth.mandatory,
  upload.single("img"),
  ProductController.postProduct
);

router.patch("/", ProductController.patchProduct);

router.delete("/", ProductController.deleteProduct);

module.exports = router;
