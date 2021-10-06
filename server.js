const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/conncection');
const mysql = require('mysql2');
const { prompt } = require('inquirer');
// function to begin prompts with inquirer package
function Setup() {
    prompt([
        {
            name: "list",
            type: "list",
            message: "Choose an option please.",
            choices: [
                "View Employees",
                "View Roles",
                "View Departments",
                "Add Employee(s)",
                "Add Role",
                "Add Department",
                "Leave"
            ],
        },
        // Runs function depending on which option is chosen
    ]).then(answers => {
        if(answers.list === "View Employees") {
            viewEmployees();
        } else if (answers.list === "View Roles") {
            viewRoles();
        } else if (answers.list === "View Departments") {
            viewDepartments();
        } else if (answers.list === "Add Employee(s)") {
            addEmployees();
        } else if (answers.list === "Add Role") {
            addRole();
        } else if (answers.list === "Add Department") {
            addDepartment();
        } else if (answers.list === "Leave") {
            db.end();
        }
    });
};
//  function to view all employees
function viewEmployees() {
    db.query('SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.first_name, manager.lastname AS "manager_lastname" FROM employee LEFT JOIN role ON employee.role_id = role_id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;',
    function (err, res) {
        if(err) throw err;
        console.table(res);
        Setup();
})};
// function to view the roles
function viewRoles() {
    db.query(' SELECT role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department_id',
    function (err, res) {
        if(err) throw err;
        console.table(res);
        Setup();
})};
//  function to view the departments
function viewDepartments() {
    db.query('SELECT * FROM department',
    function (err, res) {
        if(err) throw err;
        console.table(res);
        Setup();
})};
// function to add employees
function addEmployees() {
    db.query("select id, title from role", (err, role) => {
        db.query("select id, last_name from employee", (err, manager) => {
        // uses inquirer prompt to gather employee info
            prompt([
                {
                    type:"input",
                    name:"first_name",
                    message: "What is the employee's first name?"
                },
                {
                    type:"input",
                    name:"last_name",
                    message: "What is the employee's last name?"
                },
                {
                    type:"input",
                    name:"role_id",
                    message: "What is the employee's role id at the company?"
                },
                {
                    type:"input",
                    name:"manager_id",
                    message: "What is the employee's manager id?"
                }
            ]).then(answer => {
                db.query('INSERT INTO employee SET', [answer],
                function (err) {
                    if(err) throw err;
                    Setup();
                });
            });
        });
    });
};
// function to add a role
function addRole() {
    db.query('select id, name from department', (err, department) => {
        prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the role are you assigning you employee?'
            },
            {   
                type: 'input',
                name: 'title',
                message: 'What is the salary of the role you would like to add?'
            },
            {   
                type: 'input',
                name: 'title',
                message: 'What is the department id for the current role"'
            }
        ]).then(answer => {
            db.query('INSERT INTO role SET ?', [answer],
            function(err) {
                if (err) throw err;
                Setup();
            });
        });
    });
};
//  function to add a department
function addDepartment() {
    prompt([
        {
            type: "input",
            name: "name",
            message: "What department would you like to add?",
        },
    ]).then(answer => {
        db.query("INSERT INTO department SET?", [answer], function (err) {
            if (err) throw err;
            // calls the setup function after running every function
            Setup();
        })
    })
};

// calling the prompt function
Setup();

// connect the database or throw error
db.connect((err) => {
    if (err) throw err;
    console.log("db connected")
});


