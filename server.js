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
        initalSetup();
})};
// function to add employees
function addEmployees() {

};
// function to add a role
function addRole() {

};
//  function to add a department
function addDepartment() {

};

// calling the prompt function
Setup();

// connect the database or throw error
db.connect((err) => {
    if (err) throw err;
    console.log("db connected")
});


