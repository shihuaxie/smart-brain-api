const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
const app = express();

app.use(express.json());

const allowedOrigins = [
    'http://localhost:3000',
    'https://sylvia-smart-brain.netlify.app',
];

app.use(cors({
    origin:allowedOrigins,
    credentials:true
}));

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jagdkgjqlw3eq';

mongoose.connect(process.env.MONGO_URL);


//test
app.get('/test', (req, res) => {
    res.json('test ok');
})

//register
app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        //res.json(userDoc);
        res.json({user: userDoc, message: 'Registration successful'});
    } catch (err) {
        //res.status(422).json(err);
        res.status(422).json({error: err.message});
    }
})

//sign in
app.post('/signin', async (req, res) => {
    const {signInEmail, signInPassword} = req.body;
    const userDoc = await User.findOne({email: signInEmail});
    if (userDoc) {
        const passOk = bcrypt.compareSync(signInPassword, userDoc.password);
        if (passOk) {
            jwt.sign({signInPassword: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({user: userDoc, message: 'password found'});
            });
        } else {
            res.status(422).json('password not found');
        }
    } else {
        res.json('not found');
    }
})

app.listen(4321);

