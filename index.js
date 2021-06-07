const inquirer = require("inquirer");
const fs = require("fs");
const engineer = require("./lib/engineer");
const intern = require("./lib/intern");
const manager = require("./lib/manager");

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

function initHtml() {
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <title>My Team</title>
        </head>
        <body>
            <nav class="navbar navbar-dark bg-dark mb-5">
                <span class="navbar-brand mb-0 h1 w-100 text-center">My Team</span>
            </nav>
            <div class="container">
                <div class="row">`;
    fs.writeFile("./home/roster.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Starting employee registration.");
}

function newHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Intern</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address:<a href="mailto:${email}"></a></li>
                    <li class="list-group-item">School: ${school}</li>
                </ul>
                </div>
            </div>`;
        } else if (role === "engineer") {
            const gitHub = member.getGitHub();
            data = `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Engineer</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address: ${email}</li>
                    <li class="list-group-item">GitHub: ${gitHub}</li>
                </ul>
                </div>
            </div>`;
        } else {
            const officePhone = member.getOfficeNum();
            data = `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Manager</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address: ${email}</li>
                    <li class="list-group-item">Office Phone: ${officePhone}</li>
                </ul>
                </div>
            </div>`
        }
        console.log("Adding team member(s).");
        fs.appendFile("./home/roster.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function endHtml() {
    const html = ` </div>
        </div>
        </body>
        </html>`;

    fs.appendFile("./home/roster.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Completed employee registration.");
}

initIndex();