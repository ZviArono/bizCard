const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // get token
    let token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied, unauthorized");
    // verify Token
    let payload = jwt.verify(token, process.env.jwtKey);
    // save payload
    req.payload = payload;
    next();
  } catch (error) {
    res.status(400).send("Invaled Token " + error);
  }
};
