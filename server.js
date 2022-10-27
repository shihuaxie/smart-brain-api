const express = require('express')
//middleware
const bodyParser = require('body-parser')
//bcrypt
const bcrypt = require('bcrypt-nodejs')
//cors
const cors = require('cors');
//knex
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
       ssl:true,
    }
});

//console.log(db.select('*').from('users').then(data => console.log(data)));

const app = express();

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {res.send('it is working!')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})


app.listen(process.env.PORT || 3000, () => {console.log(`app  is working on port ${process.env.PORT}`)})


/*
things need to be done:
1. /signin -->post-->return success/failed
2. /register -->post --> return user
3. /profile/:userId--> get -->return user
4. /image  -->put --> return user, every time they submit an image we want to increase the entries
 */