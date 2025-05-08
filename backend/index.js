// require('dotenv').config();
// import dotenv from "dotenv";
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
const connect_db=async()=>{
    try {
        
        const res= await mongoose.connect(process.env.MONGO_URI)
       console.log ("Database connected successfully")
    } catch (error) {
       console.log(error) 
    }
}
connect_db()

    app.listen(process.env.PORT, () => console.log(`Server on ${process.env.PORT}`));
  