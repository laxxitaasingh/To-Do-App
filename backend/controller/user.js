const db = require('../database/db');
const express = require('express');
const router = express.Router();
const redisClient = require('../database/redis');
var bcrypt = require('bcryptjs');;
const bp = require('body-parser');




router.use(bp.json())





const signUp = async (req, res) => {
    // const { username, password } = await req.body;
    // const sql1 = `SELECT * FROM Users WHERE username = ? AND password = ?`;
    // const sql2 = `INSERT INTO Users (username, password) VALUES (?,?); `
    // console.log({username, password});
    // db.query(sql2, [username, password], (err, result) => {
    //     if (err) {
    //         console.error('MySQL error:', err);
    //         res.status(500).json({ success: false, message: 'Internal server error' });
    //     }
    //     else {
    //         res.json({ success: true, message: result })
    //     }
    // })
    const data = req.body;
    db.query(
        "SELECT username FROM Users WHERE Username=?",
        [data.username],
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            }
            if (result.length > 0) {
                console.log(result);
                // res.status(403).json({
                //     message: "Email already exists",
                // });
                res.json({ success: false, message: 'Email already exists' })
            } else { 

            db.query(
                "INSERT INTO Users (username, password) values (?,?)",
                [data.username, data.password],
                (err, results) => {
                    if (err) {
                        res.status(500).json({
                            msg: "Internal server error",
                        });
                    } else {
                        console.log(results);
                        console.log(req.session);
                        //res.send(results);
                        res.json({ success: true, message: result })
                    }
                }
            );


        }
    }
);
}



const login = async (req, res) => {
   // const username = req.session.username;
    const { username, password } = req.body;
    const sql = `SELECT * FROM Users WHERE username = ? AND password = ?`;
    //question mark is used to prevent sql injection
 
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            if (result.length > 0) {

                const rest = username;
                console.log(rest);
                console.log(req.sessionID);
               
                redisClient.set(req.sessionID, rest);
                   
               
                res.cookie("sessionID", req.sessionID, {
                    maxAge: 9000000,
                    // httpOnly: true
                });
                console.log(req.sessionID);


                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, message: 'Invalid credentials' });
            }
        }
    });
};
 

      
const logout= async (req,res)=>{
    const sessionId = await req.sessionID;
   

  redisClient.del(sessionId, async (err, reply) => {
    if (err) {
      console.error('Error deleting session from Redis:', err);
      await res.status(500).send('Internal Server Error');
    } else {
      console.log('Session deleted from Redis:', reply);
      //res.clearCookie('sessionID'); // Clear the session cookie
      //res.send('Logout successful');
    }
  });

}    


// const logout = (req, res) => {
//     const cookie = req.cookies.sessionID;
//     console.log(cookie);
//     redisClient.del(cookie);
//     console.log(req);
//     res.clearCookie("sessionID");
//     res.send("logged out successfully");
//   };





module.exports = {login,signUp,logout};