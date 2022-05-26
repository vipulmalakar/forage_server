require('dotenv').config();
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res.status(403).send("A token is required for authentication");
    }else{

      const data = jwt.verify(token, process.env.SECRET_KEY);
      if(data){
      next();
      }else{
        // Access Denied
        res.status(401).send("A token is required for authentication");
      }
      // req.userId = data.user_id;
      // req.userEmail = data.email;
    }
  } catch {
    res.status(403).send("Token Expired");
  }
};

module.exports = authorization;