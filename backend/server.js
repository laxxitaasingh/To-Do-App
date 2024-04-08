/**
 * Required modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes= require('./routes/taskroute');
const auth=require('./routes/authenticator');
//const loginUser= require('../CORS - BE/routes/login');
const redisClient= require('./database/redis');
//const signup= require('../CORS - BE/routes/signup');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
global.connection = require("./database/db");

/**
 * CORS options
 */
const corsOptions ={
    origin : 'http://localhost:4200',
    credentials : true
}


const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the RedisStore to store sessions in Redis
const sessionStore = new RedisStore({
    client: redisClient,
    // add other configurations if necessary
  });
app.use(cookieParser())

/**
 * Session config
 */
app.use(session({
    key: 'sessionId',
    secret: 'your-secret-key',    // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        expires: 10000 * 60 * 10
    },
  }));


app.use(cors(corsOptions));




app.post('/test',(req,res)=>{
    console.log('test api');
    res.cookie('test2','value',{maxAge:60000})
    res.json({
        status:true,
        message:'Success',
        requestBody: req.body,
    })
});

/**
 * Routes
 */
app.use(auth);
app.use(taskRoutes);

/**
 * Start Server
 */
app.listen(3000,()=>{
    console.log("Server listening on port 3000");
})