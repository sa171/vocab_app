var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"6512",
    database:"mydb"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
    con.query("select * from credentials",function(err, result, fields){
        if(err) throw err;
        console.log(result);
    });
    console.log("Success");
});


module.exports = con;
