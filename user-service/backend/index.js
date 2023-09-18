import express from "express"
import mysql from "mysql2"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Users"
})

// allow users to send requests via json
app.use(express.json());

app.get("/", (req, res)=>{
    res.json("hi backend")
})

app.get("/users", (req,res)=>{
    const query = "SELECT * FROM Users"
    db.query(query, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// CRUD operations
app.post("/users", (req, res)=>{
    const query ="INSERT INTO Users (`email`,`password`) VALUES (?)"
    const values = [
        req.body.email,
        req.body.password
    ]

    db.query(query, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("user created successfully.")
    })
})

app.listen(8000, () => {
    console.log("connected to backend!");
})