import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split([" "])[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_KEY);
    res.user = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};



