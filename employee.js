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

    ]).then(function (answer) {
        switch (answer.menuChoice) {
            case "Add":
                ADD();
                break;
            case "View":
                VIEW();
                break;
            case "Update":
                GetEmployeesandRoles();
                break;
        }
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
            console.log("new Employee", newEmployee);
            connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [newEmployee["First Name"], newEmployee["Last Name"], newEmployee["Role ID"], newEmployee["Manager ID"]], function (err, data) {
                if (err)
                    throw err;

                console.log(`${data.affectedRows} employee added!`);

                mainMenu();
            }
            )
        });
}


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

function UPDATE(employeeList, roleList) {

    inquirer
        .prompt([
            {
                message: "Which employee would you like to update?",
                name: "employee",
                type: "list",
                choices: employeeList
            },
            {
                message: "What would you like to change the role to?",
                name: "role",
                type: "list",
                choices: roleList
            }

        ]).then(function (answer) {
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                  {
                    role_id: answer.role
                  },
                  {
                    id: answer.employee
                  }
                ],
                function(error) {
                  if (error) throw err;
                  console.log("Role updated successfully!");
                  mainMenu();
                }
              );
        }
        )
};

function GetEmployeesandRoles() {
    //
    const queryEmployee = `SELECT * FROM employee`;
    const queryRole = `SELECT * FROM role`;
    //console.log(query);
    connection.query(queryEmployee, function (err, data) {
        //create employeeList ie: [{name: "John Doe", value: 2}, {name:"Big Bird", value: 5}] to use in Update function
        
        const employeeList = data.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })
        //create roleList ie:[{name: "Engineer", value: 0}, {name: "Product Owner", value: 2}]
        connection.query(queryRole, function (err, data) {
            const roleList = data.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })

            UPDATE(employeeList, roleList)
        })
    })
}