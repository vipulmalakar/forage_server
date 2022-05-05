require('dotenv').config();
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace('Bearer ', '');
    if (!token) {
      res.status(403).send("A token is required for authentication");
    }
      const verified = jwt.verify(token, process.env.SECRET_KEY);
      if(verified){
        // res.send("Successfully Verified");
        next();
      }else{
          // Access Denied
          res.status(401).send(error);
      }
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

module.exports = authenticate;
