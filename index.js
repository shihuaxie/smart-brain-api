const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

mongoose.connect(process.env.MONGO_URL)


//test
app.get('/test', (req, res) =>{
    res.json('test ok');
})

//register
app.post('/register', (req, res) =>{
    const {name, email, password} = req.body;
    res.json({name, email, password});
})

//login
app.listen(4321);

