const connection = require('./connection');
const mysql = require('mysql');

class queryConnector{
    connection;

    constructor(connection){
        this.connection = connection;
    }

    findbyusername(user){
        var sql = "select username from credentials where username = "+mysql.escape(user);
        console.log(sql);
        connection.query(sql,function(err,result){
            if(err){
                console.error(err.message);
                return false;
            }else{
                console.log(result[0]);
                if(result[0] != undefined){
                    console.log("Username found",user);
                    return true;
                } else {
                    return false;
                }
                
            }
        });
    }

    insertNewUser(data){
        var sql = "insert into credentials (emailId,username,passwords) VALUES ?";
        var values = [[data.email,data.username, data.password]];
        console.log(values);
        connection.query(sql, [values], function (err, result) {
            if (err){
                console.log("Error occured while inserting new user");
                throw err;
            } 
            console.log("Number of records inserted: " + result.affectedRows);
        });
    }
}

module.exports = new queryConnector(connection);