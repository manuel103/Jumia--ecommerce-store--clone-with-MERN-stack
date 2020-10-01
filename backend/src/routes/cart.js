import express from "express";

import { addItemToCart } from "../controllers/cart.js";
import { requireSignin, userMiddleware } from "../common-middleware/index.js";
const router = express.Router();

router.post("/user/cart/addtocart", requireSignin, userMiddleware, addItemToCart);

export default router;
