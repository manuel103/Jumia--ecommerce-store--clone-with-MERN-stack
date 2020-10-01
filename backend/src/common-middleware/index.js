import jwt from "jsonwebtoken";

const requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    // console.log(token);
    next();
  } else {
    return res.status(400).json({ message: "Authorization required!" });
  }
};

const userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res
      .status(400)
      .json({ message: "You do not have permission to access this resource!" });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json({ message: "You do not have permission to access this resource!" });
  }
  next();
};

export { requireSignin, adminMiddleware, userMiddleware };
