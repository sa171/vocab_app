const express = require('express');
const router = express.Router();
const userRegisteration = require('./registeration');
const queryConnector = require('./queryConnector');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');

dotenv.config();

router.get('/',(req,res) => {
    console.log(req.cookies);
    if(req.cookies.data != null){
        token = req.cookies['jwt'];
        const verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("Verify username = ",verify);
        if(verify){
            res.render('vocabcards');
        }
    } else{
        res.status(201);
        res.render('./index.ejs');
    }
    
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
        let data = req.body.username;
        const token = jwt.sign({data}, process.env.JWT_SECRET_KEY, {
            expiresIn: '120s'
        }); 
        console.log(token);
        res.cookie('jwt',token);
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