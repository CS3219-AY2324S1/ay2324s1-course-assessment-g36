const express = require("express");

const app = express();
const db = require("./models");

app.use(express.json());

// Routers
const userRouter = require('./routes/Users');
app.use("/users", userRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    })
})

// // allow users to send requests via json
// app.use(express.json());
// app.use(cors())

// // CRUD operations
// // CREATE
// app.post("/users", (req, res)=>{
//     const query ="INSERT INTO Users (`email`,`password`) VALUES (?)"
//     const values = [
//         req.body.email,
//         req.body.password
//     ]

//     db.query(query, [values], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json("user created successfully.")
//     })
// })

// // READ
// app.get("/users", (req,res)=>{
//     const query = "SELECT * FROM Users"
//     db.query(query, (err, data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

// // UPDATE
// app.put("/users/:id", (req, res) => {
//     const userId = req.params.id;
//     const q = "UPDATE Users SET `email`= ?, `password`= ? WHERE id = ?";
  
//     const values = [
//       req.body.email,
//       req.body.password,
//     ];
  
//     db.query(q, [...values,userId], (err, data) => {
//       if (err) return res.send(err);
//       return res.json(data);
//     });
//   });

// // DELETE
// app.delete("/users/:id", (req, res)=>{
//     const userId = req.params.id;
//     const query = 'DELETE FROM Users WHERE id = ?'

//     db.query(query, [userId], (err, data)=>{
//         if (err) return res.json(err);
//         return res.json("User deleted!")
//     })
// })
