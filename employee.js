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
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Add department", "Remove Employee", "Update Employee Role", "Update Employee Manger", "Quit"]
        }
        // Bonus function
        // function mainMenu() {
        //     inquirer.prompt([
        //         {
        //             message: "What would you like to do?",
        //             name: "menuChoice",
        //             type: "list",
        //             choices: [  "View All Employees", "View All EMployees By Department", "View All EMployees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manger"]
        //         }

    ]).then(function (answer) {
        if (answer.menuChoice === "View All Employees") {
            console.log("Data List")
        } else if (
            answer.menuChoice === "View All Employees By Department"
        ) {
            console.log("insert function")
        } else if (
            answer.menuChoice === "View All Employees By Manager"
        ) {
            console.log(X)
        } else if (
            answer.menuChoice === "Add Employee"
        ) {
            console.log("X")
        } else if (
            answer.menuChoice === "Add department"
        ) {
            console.log("B")
        } else if (
            answer.menuChoice === "Update Employee Role"
        ) {
            console.log("Update")
        } else if (
            answer.menuChoice === "Update Employee Manger"
        ) {
            console.log("Update")
        } else if (
            answer.menuChoice === "Quit"
        ) {
            console.log("Quite")
        }




        // switch example:
        // switch (answer.menuChoice) {
        //     case "View All Employees":
        //         console.log(answer.menuChoice);
        //         break;
        // }
    })
};