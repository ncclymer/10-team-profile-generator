const Employee = require("../Lib/employee");

describe("Employee", () => {
    describe("getName", () => {
        it("Name is generated.", () => {
            const name = "Nick";
            const nameTest = new Employee(name, "12", "newemail@gmail.com");
            expect(nameTest.getName()).toBe(name);
        });
    });

    describe("getID", () => {
        it("ID is generated.", () => {
            const eId = "12";
            const idTest = new Employee("Nick", eId, "newemail@gmail.com");
            expect(idTest.getId()).toBe(eId);
        });
    });

    describe("getEmail", () => {
        it("Email is generated.", () => {
            const email = "newemail@gmail.com";
            const idTest = new Employee("Nick", "12", email);
            expect(idTest.getEmail()).toBe(email);
        });
    });

    describe("getRole", () => {
        it("Role is generated", () => {
            const roleString = "employee";
            const roleTest = new Employee("Nick", 1, "newemail@gmail.com");
            expect(roleTest.getRole()).toBe(roleString);
        });
    });
});