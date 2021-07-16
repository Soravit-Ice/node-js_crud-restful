let mysql = require('mysql');


// database
let dbMysql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'EmployeeDB'
})

dbMysql.connect((err)=>{
    if(!err){
    console.log("Connnect DB Success")
    }
    else{
    console.log("Connnect DB FAIL")
    }
    
})

module.exports = dbMysql;