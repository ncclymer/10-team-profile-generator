const employee = require("./employee");

class manager extends employee {
    constructor(name, id, email, officeNum) {
        super(name, id, email);
        this.officeNum = officeNum;
    }
    getOfficeNum() {
        return this.officeNum;
    }
    getRole() {
        return "manager"
    }
}

module.exports = manager;