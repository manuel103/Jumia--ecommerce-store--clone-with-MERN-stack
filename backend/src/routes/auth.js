import express from "express";
import mongoose from "mongoose";
import { signin, signup } from "../controllers/auth.js";
import {
  isRequestValidated,
  validateSigninRequest,
  validateSignupRequest,
} from "../validators/auth.js";

const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/signin",validateSigninRequest,isRequestValidated, signin);

// router.post('/profile', requireSignin, (req, res)=>{
//     res.status(200).json({user: 'profile'})
// })

// module.exports = router;
export default router;
