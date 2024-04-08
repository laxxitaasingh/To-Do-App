// const redis = require("redis");
// const session = require('express-session');
// const express = require("express");
// const app = express();
// const RedisStore = require('connect-redis').default;
// const redisClient =  redis.createClient();

// app.use(
//   session({
//     name: "session_id",
//     secret: "Secret Key",
//     resave: false,
//     saveUninitialized: false,
//     store: new RedisStore({ client: redisClient }),
//   })
// );

// redisClient.on("error", function(err) {
//   console.log("Could not establish a connection with redis. " + err);
// });
// redisClient.on("connect", function(err) {
//   console.log("Connected to redis successfully");
// });

// //module.exports = redisClient;
const express = require('express');

const redis = require('redis');

const app = express();

// Create a Redis client
const redisClient = redis.createClient({
  host: 'localhost', // Your Redis server host
  port: 6379,         // Your Redis server port
  // add other configurations if necessary
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });
  
  redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
  });


  



module.exports = redisClient;

// Your routes and other middleware can go here
