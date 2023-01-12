import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

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

app.get("/lists", (req,res)=>{
    const q = "SELECT * FROM list"
    db.query(q,(err,data)=>{
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
    const q = "INSERT INTO `list` ( `name`, `amount`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.amount,   
    ]

    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("list has been added successfully")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!!")
})