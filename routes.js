const express = require('express');
const router = express.Router();
const userRegisteration = require('./registeration');
const queryConnector = require('./queryConnector');

router.get('/',(req,res) => {
    res.render('./index.ejs');
});

router.get('/registeration', (req,res)=>{
    console.log("Registeration started");
    res.render('registeration');
});

router.post('/login', function(req,res){
    console.log('Checking user availability');
    
});

router.post('/registeration',(req,res) => {
    req.body;
    console.log(req.body);
    var isPresent = queryConnector.findbyusername(req.body.username);
    console.log("isPresent?",isPresent);
    if(isPresent == true){
        alert('username already exist');
        res.render('registeration');
    }else{
        userRegisteration(req.body);
        res.render('index');
    }
    
});


module.exports = router;