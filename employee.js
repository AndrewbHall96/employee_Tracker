var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    
    port: 3306,

    user: "root",

    password: "Cookie123",
    database: "employee_db"
});