const Intern = require('../lib/Intern');

describe("Intern", () => {
    describe("getName", () => {
        it("Name is generated.", () => {
            const name = "Kelsey";
            const nameTest = new Intern(name, "12", "email", "github");
            expect(nameTest.getName()).toBe(name);
        });
    });

    describe("getID", () => {
        it("ID is generated.", () => {
            const eId = "12";
            const idTest = new Intern("Kelsey", eId, "email", "github");
            expect(idTest.getId()).toBe(eId);
        });
    });

    describe("getEmail", () => {
        it("Email is generated.", () => {
            const email = "test@gmail.com";
            const emailTest = new Intern("Kelsey", "12", email, "github");
            expect(emailTest.getEmail()).toBe(email);
        });
    });

    describe("getSchool", () => {
        it("School is generated.", () => {
            const school = "University of Denver";
            const schoolTest = new Intern("Kelsey", "12", "test@gmail.com", school);
            expect(schoolTest.getSchool()).toBe(school);
        });
    });

    describe("getRole", () => {
        it("Role is generated.", () => {
            const roleString = "Intern";
            const roleTest = new Intern("Kelsey", 1, "test@gmail.com", "github");
            expect(roleTest.getRole()).toBe(roleString);
        });
    });
});