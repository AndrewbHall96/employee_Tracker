var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Cookie123",
    database: "employee_db"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

});

mainMenu()

function mainMenu() {
    inquirer.prompt([
        {
            message: "What would you like to do?",
            name: "menuChoice",
            type: "list",
            choices: ["View All Employees", "View All EMployees By Department", "View All EMployees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manger"]
        }
    ]).then(function (answer) {
        switch (answer.myChoice) {
            case "View All Employees":
                console.log(answer.menuChoice);
                break;
        }
    })
};