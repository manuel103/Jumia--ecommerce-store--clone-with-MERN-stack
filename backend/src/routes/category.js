import express from "express";
import multer from "multer";
import { addCategory, getCategories } from "../controllers/category.js";
import { adminMiddleware, requireSignin } from "../common-middleware/index.js";
import shortid from "shortid";
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
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/getcategory", getCategories);

export default router;
