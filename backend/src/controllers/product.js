import express from "express";
import Product from "../models/product.js";
import shortid from "shortid";
import slugify from "slugify";

const router = express.Router();

const createProduct = (req, res) => {
  //   res.status(200).json({ file: req.files, body: req.body });

  const { name, price, description, quantity, category, createdBy } = req.body;

  let productImages = [];

  if (req.files.length > 0) {
    productImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productImages,
    category,
    createdBy: req.user._id,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

export { createProduct };
