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
            choices: ["View All Departments, Roles or Employees", "Add Department, Role or Employee", "Update Employee Roles", "Quit"]
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
        if (answer.menuChoice === "View All Departments, Roles or Employees") {
            function ADD()
        } else if (
            answer.menuChoice === "Add Department, Role or Employee"
        ) {
            console.log("X")
        } else if (
            answer.menuChoice === "Update Employee Roles"
        ) {
            console.log("B")
        } else {
            connection.end();
        }

        // switch example:
        // switch (answer.menuChoice) {
        //     case "View All Employees":
        //         console.log(answer.menuChoice);
        //         break;
        // }
    })
};

function ADD() {
    inquirer
    prompt([
        {
            name: "menuADD",
            type: "list",
            choices: ["Add Department", "Add Role", "Add Employee"]
        }

    ]).then(function (answer) {
        if (answer.menuADD === "Add Department") {
            console.log("Added Department")
        } else if (
            answer.menuChoice === "Add Role"
        ) {
            console.log("Added Role")
        } else if (
            answer.menuChoice === "Add Employee"
        ) {
            console.log("Added Employee")
        } else {
            connection.end();
        }
    }
    )
};

function VIEW() {
    inquirer
    prompt([
        {
            name: "menuVIEW",
            type: "list",
            choices: ["View Departments", "View Roles", "View Employees"]
        }

    ]).then(function (answer) {
        if (answer.menuVIEW === "View Departments") {
            console.log("Viewing Departments")
        } else if (
            answer.menuChoice === "View Roles"
        ) {
            console.log("Viewing Roles")
        } else if (
            answer.menuChoice === "View Employees"
        ) {
            console.log("Viewing Employees")
        } else {
            connection.end();
        }
    }
    )
};