const express = require('express');
const router = express.Router();
const userRegisteration = require('./registeration');
const queryConnector = require('./queryConnector');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
const https = require('https');
var flash = require('express-flash-messages');
const cookieParser = require('cookie-parser');
const session = require('express-session');

router.use(flash());
router.use(cookieParser('keyboard cat'));
router.use(session({ cookie: { maxAge: 60000 }, secret:"123"}));

dotenv.config();

router.get('/',(req,res) => {
    console.log(req.cookies);
    if(req.cookies.data != null){
        token = req.cookies['jwt'];
        const verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("Verify username = ",verify);
        if(verify){
            res.render('vocabcards',{query:false,def:"NA"});
        }
    } else{
        res.status(201);
        res.render('./index.ejs',);
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
        res.render('vocabcards',{query:false,def:"NA"});
    }
});

router.post('/fetchWords', function(req,res){
    let word = req.body.word;
    let uri = process.env.API_PATH +req.body.lang+"/"+word;
    console.log("uri =",uri);
    const options = {
        hostname: process.env.API_HOST,
        path:uri,
        method: 'GET'
    };
    const apiRequest = https.request(options,(err,response) => {
        if(err){
            console.log("Error : "+err);
        } else{
            response.on('data', d => {
                let data = JSON.parse(d.toString());
                if(data[0] == undefined){
                    res.render('vocabcards',{query:false, def:word});
                } else{
                    console.log("data object", data[0]);
                    data = getDefinition(data);
                    if(data == "NA"){
                        res.render('404');
                    }else{
                        res.render('vocabcards',{query:true, def:data});
                    }
                }
                
            });
        }
    });

    apiRequest.on('error', error => {
        console.log(error);
        res.send("404");
    });
    apiRequest.end();
    
});

router.get('/404', function(req,res){
    res.render('404');
});

function getDefinition(data){
    try {
        return data[0]['meanings'][0]['definitions'];
    } catch (error) {
        return "Err";
    }
    
}


router.post('/registeration',async (req,res) => {
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