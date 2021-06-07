const inquirer = require("inquirer");
const fs = require("fs");
const engineer = require("./lib/engineer");
const intern = require("./lib/intern");
const manager = require("./lib/manager");
const test = require('jest');
const { choices } = require("yargs");

const employee = [];

function initIndex() {
    initHtml();
    addEmp();
}

function addEmp() {
    inquirer.prompt([{
        message: "Please enter employee name.",
        name: "name"
    },
    {
        type: "list",
        message: "Please select employee role:",
        choices: [
            "intern",
            "engineer",
            "manager"
        ],
        name: "role"
    },
    {
        message: "Please enter the employee id.",
        name: "id"
    },
    {
        message: "Please enter the employee email address.",
        name: "email"
    }])
        .then(function ({ name, role, id, email }) {
            let roleData = "";
            if (role === "intern") {
                roleData = "school name";
            } else if (role === "engineer") {
                roleData = "GitHub user name";
            } else {
                roleData = "office phone number";
            }
            inquirer.prompt([{
                message: `Please enter employee ${roleData}`,
                name: "roleData"
            },
            {
                type: "list",
                message: "Are there additional employees to add?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "additional"

            }])
                .then(function ({ roleData, additional }) {
                    let additionalEmp;
                    if (role === "intern") {
                        additionalEmp = new intern(name, id, email, roleData);
                    } else if (role === "engineer") {
                        additionalEmp = new engineer(name, id, email, roleData);
                    } else {
                        additionalEmp = new manager(name, id, email, roleData);
                    }
                    employee.push(additionalEmp);
                    newHtml(additionalEmp)
                        .then(function () {
                            if (additional === "yes") {
                                addEmp();
                            } else {
                                endHtml();
                            }
                        });

                });
        });
}

initIndex();