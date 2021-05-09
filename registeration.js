const queryConnector = require('./queryConnector');
function userRegisteration(data){
    queryConnector.insertNewUser(data);
}

module.exports=userRegisteration;