import express from "express";
// import Category from "../models/category.js";
// import slugify from "slugify";
import shortid from "shortid";
// import { addCategory, getCategories } from "../controllers/category.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { adminMiddleware, requireSignin } from "../common-middleware/index.js";
import { createProduct } from "../controllers/product.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(path.dirname(fileURLToPath(import.meta.url)), "../uploads")
    );
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productImage"),
  createProduct
);
// router.get("/category/getcategory", getCategories);

export default router;
