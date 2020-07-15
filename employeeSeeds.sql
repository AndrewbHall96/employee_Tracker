USE employee_db;

INSERT INTO department (name) VALUES ("Management"), ("Finance");

INSERT INTO role (title, salary, department_id) VALUES ("Manager", "125000", "1");

-- Question for tutor. What is the relationship between department if in role table and department id in department table?

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andrew", "Marcher", "?", "?");