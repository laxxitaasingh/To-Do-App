const redisClient = require("../database/redis");


const checkAuth = (req, res, next) => {
  try{
    console.log('asdfasdfasdfasdfasdfasdfasdfasdf')
    console.log(req.cookies.sessionID);
    if (!req.sessionID) {
      console.log("sessionID is undefined");
      res.status(401).send("Please Login");
    } else {
      const token = req.cookies.sessionID;
      console.log(token);
      redisClient.get(token, (err, verify) => {
        console.log(token);
        if (verify == null) {
          console.log("Unverified");
          res.status(401).json({
            message: "PLease login",
          });
        } else {
          req.user_id = verify;
          console.log(verify);
          next();
        }
      });
    }}
    catch (error) {
      // Handle the error appropriately, e.g., sending a 500 Internal Server Error response
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = checkAuth;