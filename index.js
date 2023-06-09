const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

app.get('/test', (req, res) =>{
    res.json('test ok');
})

app.listen(4321);