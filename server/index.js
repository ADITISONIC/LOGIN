const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(
  cors({
    origin: "http://localhost:5173", // React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // If you need cookies or credentials
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes

app.post('/login',(req,res)=>{
    const {email,password} = req.body
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("Success")
            }
            else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("No record exsisted")
        }
    })
})

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employee) => res.status(201).json(employee))
    .catch((err) => res.status(500).json(err));
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
