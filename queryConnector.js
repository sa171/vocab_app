const connection = require('./connection');
const mysql = require('mysql');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
class queryConnector{
    connection;

    constructor(connection){
        this.connection = connection;
    }

    async findbyusername(user){
        var sql = "select username from credentials where username = "+mysql.escape(user);
        console.log(sql);
        var exists = false;
        try{
            const rows = await query(sql);
            console.log("rows = ",rows);
            if(rows[0].username != undefined){
                exists = true;
            }
            
        } catch{
            console.log("Error occured during query execution");
        }
        console.log("Exists? ",exists);
        return exists;
    }

    async verifyCredentials(data){
        var sql = "select username from credentials where passwords = "+mysql.escape(data.password)+" and username = "+mysql.escape(data.username);
        console.log(sql);
        var exists = false;
        try{
            const rows = await query(sql);
            console.log("rows = ",rows);
            if(rows[0].username != undefined){
                exists = true;
            }
            
        } catch{
            console.log("Error occured during query execution");
        }
        console.log("Exists? ",exists);
        return exists;    
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