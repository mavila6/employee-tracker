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

};
// function to view the roles
function viewRoles() {

};
//  function to view the departments
function viewDepartments() {

};
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


