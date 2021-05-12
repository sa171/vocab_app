const express = require('express');
const router = express.Router();
const userRegisteration = require('./registeration');
const queryConnector = require('./queryConnector');

router.get('/',(req,res) => {
    res.status(201);
    res.render('./index.ejs');
});

router.get('/registeration', (req,res)=>{
    console.log("Registeration started");
    res.render('registeration',{isPresent:false});
});

router.post('/login', async function(req,res){
    console.log('Checking user availability');
    var isPresent = await queryConnector.verifyCredentials(req.body);
    console.log("isPresent = ",isPresent);
    if(isPresent == false){
        res.render('index');
    }else{
        res.render('vocabcards');
    }
});

router.post('/registeration',async (req,res) => {
    req.body;
    console.log(req.body);
    var isPresent = await queryConnector.findbyusername(req.body.username);
    console.log("isPresent?",isPresent);
    if(isPresent == true){
        res.render('registeration',{isPresent:true});
    }else{
        userRegisteration(req.body);
        res.render('index');
    }
    
});


module.exports = router;