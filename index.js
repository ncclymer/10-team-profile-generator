const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const employee = [];

const generateTeam = [{
    type: "input",
    name: "managerName",
    message: "What is the Manager's name?",
 
},
{
    type: "input",
    name: "managerId",
    message: "What is the Manager's employee ID?",

},
{
    type: "input",
    name: "managerEmail",
    message: "What is the Manager's e-mail?",

},
{
    type: "input",
    name: "managerPhone",
    message: "What is the Manager's phone number?",

},
];

const addNewEmployee = [{
type: "list",
name: "empAdd",
message: "Would you like to add another employee?",
choices: ["Yes", "No"],
}, ];

const employeeType = [{
type: "list",
name: "typeEmp",
message: "Would you like to add an employee to your team?",
choices: ["Engineer", "Intern"],
}, ];

const questionEngineer = [{
    type: "input",
    name: "engName",
    message: "What is the Engineer's name?",
},
{
    type: "input",
    name: "engId",
    message: "What is the Engineer's ID Number?",
},
{
    type: "input",
    name: "engEmail",
    message: "What is the Engineer's e-mail?",
},
{
    type: "input",
    name: "engGithub",
    message: "What is the Engineer's GitHub account?",
},
];
const questionIntern = [{
    type: "input",
    name: "intName",
    message: "What is the Intern's name?",
},
{
    type: "input",
    name: "intId",
    message: "What is the Intern's ID Number?",
},
{
    type: "input",
    name: "intEmail",
    message: "What is the Intern's e-mail?",
},
{
    type: "input",
    name: "intSchool",
    message: "What school does the Intern go to?",
},
];

function writeToFile(fileName, f) {
fs.writeFileSync(fileName, f, (error) => {
    error ? console.log(err) : console.log("Your team's profile is ready to view!");
});
}

function newIntern() {
inquirer.prompt(questionIntern).then((res) => {
    employee.push(new Intern(res.intName, res.intId, res.intEmail, res.intSchool));
    addEmployees();
});
}

function newEngineer() {
inquirer.prompt(questionEngineer).then((res) => {
    employee.push(
        new Engineer(res.engName, res.engId, res.engEmail, res.engGithub)
    );
    addEmployees();
});
}

function newEmployee() {
inquirer.prompt(employeeType).then((res) => {
    console.log(res);
    res.typeEmp === "Engineer" ? newEngineer() : newIntern();
});
}

function addEmployees() {
inquirer.prompt(addNewEmployee).then((res) => {
    res.empAdd === "Yes" ? newEmployee() : writeToFile("./home/roster.html", teamProfile(employee));
});
}

function init() {
            inquirer.prompt(generateTeam).then((res) => {
                employee.push(
                    new Manager(
                        res.managerName,
                        res.managerId,
                        res.managerEmail,
                        res.managerPhone
                    )
                );
                addEmployees();
            }
            );
        }
init();

function genEmployees(employee) {
let htmlMain = "";
employee.forEach((obj) => {
    switch (obj.getRole()) {
        case "Engineer":
            let stringDataEng = genEngineer(obj);
            htmlMain += stringDataEng;
            break;
        case "Intern":
            let stringDataInt = genIntern(obj);
            htmlMain += stringDataInt;
            break;
        default:
            return "";
    }
});
return htmlMain;
}

function genManager(employee) {
let managerData = "";
employee.forEach((obj) => {
    if (obj.getRole() === "Manager") {
        managerData = `			
    <div class="row center-align">
    <div class="col s12 m4 offset-m4">
        <div class="card blue center-align">
            <div class="card-content black-text">
                <span class="card-title">${obj.getName()}</span>
                <p>${obj.getRole()}</p>
            </div>
            <div class="card-action">
                <a href="#">${obj.getId()}</a>
                <a href="#">${obj.getEmail()}</a>
                <a href="#">${obj.getOfficeNumber()}</a>
            </div>
        </div>
    </div>
    </div>
        `;
    } else {
        return "";
    }
});
return managerData;
}

function genEngineer(obj) {
return `			
<div class="row center-align">
<div class="col s12 m4 offset-m4">
<div class="card blue center-align">
  <div class="card-content black-text">
    <span class="card-title">${obj.getName()}</span>
    <p>${obj.getRole()}</p>
  </div>
  <div class="card-action">
    <a href="#">${obj.getId()}</a>
    <a href="#">${obj.getEmail()}</a>
    <a href="#">${obj.getGitHub()}</a>
  </div>
</div>
</div>
</div>
`;
}

function genIntern(obj) {
return `			
<div class="row center-align">
<div class="col s12 m4 offset-m4">
<div class="card blue center-align">
  <div class="card-content black-text">
    <span class="card-title">${obj.getName()}</span>
    <p>${obj.getRole()}</p>
  </div>
  <div class="card-action">
    <a href="#">${obj.getId()}</a>
    <a href="#">${obj.getEmail()}</a>
    <a href="#">${obj.getSchool()}</a>
  </div>
</div>
</div>
</div>
`;
}

function teamProfile(employee) {
return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<title>Team</title>
</head>
<body>
<nav>
<div class="nav-wrapper blue-grey lighten-2">
<a class="brand-logo center black-text">My Team</a>
<ul id="nav-mobile" class="left hide-on-med-and-down">
</ul>
</div>
</nav>
<div class="row center-align">
${genManager(employee)}
</div>
<div class="row center-align">
${genEmployees(employee)}
</div>
</body>
</html>
`;
}