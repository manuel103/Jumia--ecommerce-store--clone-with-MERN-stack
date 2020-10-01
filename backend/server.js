import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./src/routes/auth.js";
import adminRoutes from "./src/routes/admin/auth.js";
import categoryRoutes from "./src/routes/category.js";
import productRoutes from "./src/routes/product.js";
import cartRoutes from "./src/routes/cart.js";



env.config();
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(
  "/public",
  express.static(path.join(fileURLToPath(import.meta.url), "uploads"))
);

//DB config
const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ot7ua.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api endpoints
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

// api listener
app.listen(port, () => console.log(`Server is running on port ${port}`));
