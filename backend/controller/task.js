const db = require("../database/db");
const redisClient = require('../database/redis');



const tasks = async (req,res)=>{
    console.log('hehehehe')
    const token = req.cookies.sessionID;
    //const { username } = await req.body;
    redisClient.get(token, (error, results) => {
        if (error) {
          console.error(error);
        } else {
            const sql = `SELECT * FROM Task WHERE username = ?`;
            db.query(sql, [results], (err, result) => {
             if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
             } else {
                 if (result.length > 0) {
              console.log(result.length)
              res.json({ success: false, message: result });
          } else {
              console.log(result.length)
              res.send({ success: true, message: result });
          }
      }
  });

        }});
    
};


const addnewtask = async (req, res) => {
    const token = req.cookies.sessionID;
    redisClient.get(token, (error, results) => {
        if (error) {
          console.error(error);
        } else {
        console.log('Data from Redis:', results);
        console.log(results);
        const { task } =  req.body;
        const sql = `INSERT INTO Task (username, task_title) VALUES (?,?)`;
  
        db.query(sql, [results, task], (err, result) => {
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.send({status:true, message: result})
        }
    });
    }});
    };

  const updateStatus= async (req,res)=>{
    const token = req.cookies.sessionID;
    redisClient.get(token, (error, results) => {
        if (error) {
          console.error(error);
        } else {
            const {task} =  req.body;
   
            const sql = 'UPDATE Task SET isCompleted = 1 WHERE username = ? and task_title = ?'
            db.query(sql, [results, task], (err, result)=>{
            if(err){
                console.error('MySQL error:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
            else{
                res.send({status:true, message: 1})
            }
            });

        }});

    };
  

  const editTask= async (req,res)=>{
    const token = req.cookies.sessionID;
    redisClient.get(token, (error, results) => {
        if (error) {
            console.error(error);
        } 
        else {
            const {oldtask, task} = req.body;
    
            const sql = 'UPDATE Task SET task_title = ? WHERE username = ? and task_title = ?'
            db.query(sql, [task, results, oldtask], (err, result)=>{
            if(err){
                console.error('MySQL error:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
            else{
                res.send({status:true, message: "edited task"})
            }
        });

    }});
};

   
  const deleteTask=async(req,res)=>{
    const token = req.cookies.sessionID;
    redisClient.get(token, (error, results) => {
        if (error) {
            console.error(error);
        } 
        else {
            const {task} =  req.body;
            const sql = 'DELETE FROM Task WHERE username = ? AND task_title = ?';
            db.query(sql, [results, task], (err, result) => {
            if (err) {
                console.error('MySQL error:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
   
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Task not found or not deleted' });
            }
   
            res.json({ success: true, message: 'Task deleted successfully' });
        });
    }});
;}

  module.exports= {tasks , addnewtask, updateStatus,deleteTask,editTask};