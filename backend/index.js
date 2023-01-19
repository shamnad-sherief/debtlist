import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
const jwt = import('jsonwebtoken');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "debtlist"
})


app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.json("Hello World!!")
})


app.post("/login", (req, res) => {
    const {username, password} = req.body;
    const q = "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?";
    const values = [username, password];
    db.query(q, values, (err, data) => {
        if(err) return res.status(500).json({ message: "Internal Server Error" });
        if(data.length === 0) return res.status(401).json({ message: "Invalid credentials" });
        const userid = data[0].userid;
        console.log(userid)
        return res.status(200).json({ message: "Logged in successfully", userid });
    });
});

  


app.post("/register", (req,res)=> {
    const username = req.body.username
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'Error checking for existing user' });
        }
        if (data.length > 0) {
          return res.status(409).json({ error: 'Username already exists' });
        }

    });
    
    const q = "INSERT INTO `users` ( `username`, `password`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.password,   
    ]
      
    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("User registered successfully")
    })
})


//
// app.post("/login", (req,res)=> {
//     const username = req.body.username
//     const password = req.body.password
//     db.query('SELECT * FROM users WHERE username = ?', [username], (err, data) => {
//         if (err) {
//           return res.status(500).json({ error: 'Error checking for existing user' });
//         }
//         if (data.length === 0) {
//           return res.status(401).json({ error: 'Incorrect username or password' });
//         }
//         if (data[0].password === password) {
//             const user = {
//                 id: data[0].id,
//                 username: data[0].username
//             }
//             return res.status(200).json(user);
//         }else{
//             return res.status(401).json({ error: 'Incorrect username or password' });
//         }
//
//     });
// })



app.get("/lists", (req,res)=>{
    const userId = req.query.userId;
    const q = "SELECT * FROM list WHERE userid= ?"
    db.query(q,userId,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.delete("/lists/:id",(req,res) =>{
    const listId = req.params.id;
    const q = "DELETE FROM list WHERE id = ?"

    db.query(q,listId, (err,data) => {
        if(err) return res.json(err)
        return res.json("list has been deleted successfully")
    })
})


app.put("/lists/:id",(req,res) =>{
    const listId = req.params.id;
    const q = "UPDATE `list` SET `name` = ?, `amount` = ? WHERE `list`.`id` = ?";
    const values = [
        req.body.name,
        req.body.amount,
    ]

    db.query(q,[...values,listId], (err,data) => {
        if(err) return res.json(err)
        return res.json("list has been updated successfully")
    })
})


app.post("/lists", (req,res)=> {
    const  userId  = req.body.userId;
    console.log(userId+" add list backend")
    const q = "INSERT INTO `list` ( `name`, `amount`, `userid`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.amount,
        req.body.userId,
    ]

    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("list has been added successfully")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!!")
})