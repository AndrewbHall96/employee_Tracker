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
            message: "Would you like to Add, View, or Update a department, Role or Employee?",
            name: "menuChoice",
            type: "list",
            choices: ["Add", "View", "Update"]
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
        if (
            answer.menuChoice === "Add"
        ) {
            ADD();
        } else if (answer.menuChoice === "View") {
            VIEW();
        } else if (
            answer.menuChoice === "Update"
        ) {
            console.log("B")
        } else {
            connection.end();
        }
        //Recursion

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
        .prompt([
            {
                name: "menuADD",
                type: "list",
                choices: ["Add Department", "Add Role", "Add Employee"]
            }

        ]).then(function (answer) {

            switch (answer.menuADD) {
                case "AddDept":
                case "Add Department":
                    newDepartment();
                    break;
                case "Add Role":

            }

            connection.query("INSERT INTO ")

            // if (answer.menuADD === "Add Department") {
            //     console.log("Added Department")
            // } else if (
            //     answer.menuChoice === "Add Role"
            // ) {
            //     console.log("Added Role")
            // } else if (
            //     answer.menuChoice === "Add Employee"
            // ) {
            //     console.log("Added Employee")
            // } else {
            //     connection.end();
            // }


        }
        )
};
function newDepartment() {
    inquirer
        .prompt([
            {
                name: "deptName",
                type: "input",
            }]).then(function (newDepartment) {
                connection.query("INSERT INTO department('name') VALUES (?)", [newDepartment.deptName], function (err, data) {
                    if (err)
                        throw err;

                    console.log(`${data.affectedRows} department added!`);

                    mainMenu();
                });
            });
}
// deconstructed way= 
// }]).then(function({deptName}) {
//     connection.query("INSERT INTO department('name') VALUES (?)", [deptName]
// })


function VIEW() {
    inquirer
        .prompt([
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

function updateEmp() {
    inquirer
        .prompt([
            {
                name: "menuUPDATE",
                type: "list",
                choices: ["Update Departments", "Update Roles", "Update Employees"]
            }

        ]).then(function (answer) {
            if (answer.menuUPDATE === "Update Departments") {
                console.log("Updating Departments")
            } else if (
                answer.menuUPDATE === "Update Roles"
            ) {
                console.log("Updating Roles")
            } else if (
                answer.menuUPDATE === "Update Employees"
            ) {
                console.log("Viewing Employees")
            } else {
                connection.end();
            }
        }
        )
};