var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table")

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
            choices: ["Add", "View", "Update", "Exit"]
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
        switch (answer.menuChoice) {
            case "Add":
                ADD();
                break;
            case "View":
                VIEW();
                break;
            case "Update":
                updateEmp();
                break;
        }
        
        // if (
        //     answer.menuChoice === "Add"
        // ) {
        //     ADD();
        // } else if (answer.menuChoice === "View") {
        //     VIEW();
        // } else if (
        //     answer.menuChoice === "Update"
        // ) {
        //     console.log("B")
        // } else {
        //     connection.end();
        // }
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
                    newRole();
                    break;
                case "Add Employee":
                    newEmployee();
                    break;
            }

            // connection.query("INSERT INTO ")

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
                connection.query("INSERT INTO department(name) VALUES (?)", [newDepartment.deptName], function (err, data) {
                    if (err)
                        throw err;

                    console.log(`${data.affectedRows} department added!`);

                    mainMenu();
                });
            });
};
function newRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input"
            },
            {
                name: "salary",
                type: "input"
            },
            {
                name: "department_id",
                type: "input"
            },
            
        ]).then(function (newRole) {
            connection.query("INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)", [newRole.title, newRole.salary, newRole.department_id], function (err, data) {
                if (err)
                    throw err;

                console.log(`${data.affectedRows} role added!`);

                mainMenu();
            }
            )
        });
};
function newEmployee() {
    inquirer
        .prompt([
            {
                name: "First Name",
                type: "input"
            },
            {
                name: "Last Name",
                type: "input"
            },
            {
                name: "Role ID",
                type: "input"
            },
            {
                name: "Manager ID",
                type: "input"
            }
        ]).then(function (newEmployee) {
            connection.query("INSERT INTO employee(name) VALUES (?, ?, ?, ?)", [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id], function (err, data) {
                if (err)
                    throw err;

                console.log(`${data.affectedRows} employee added!`);

                mainMenu();
            }
            )
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
                name: "tableName",
                type: "list",
                choices: [
                    {
                        name: "View Departments",
                        value: "department"
                    },
                    {
                        name: "View Roles",
                        value: "role"
                    },
                    {
                        name: "View Employees",
                        value: "employee"
                    }
                ]
            }

        ]).then(function ({ tableName }) {
            const query = `SELECT * FROM ${tableName}`;
            //console.log(query);
            connection.query(query, function (err, data) {
                console.table(data);

                mainMenu();
            })
        }
        )
};

function updateEmp() {
    inquirer
        .prompt([
            {
                message: "Would you like to update employee roles?",
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