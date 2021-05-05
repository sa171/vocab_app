var usernames = [];
var passwords = [];

function userRegisteration(data){
    usernames.push(data.username);
    passwords.push(data.password);
    console.log(usernames);
    console.log(passwords);
}

module.exports=userRegisteration;