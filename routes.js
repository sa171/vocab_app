const express = require('express');
const router = express.Router();
const userRegisteration = require('./registeration');

router.get('/',(req,res) => {
    res.render('./index.ejs');
});

router.get('/registeration', (req,res)=>{
    console.log("Registeration started");
    res.render('registeration');
});

router.post('/registeration',(req,res) => {
    userRegisteration(req.body);
    res.render('index');
});


module.exports = router;