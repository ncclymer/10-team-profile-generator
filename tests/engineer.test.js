const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
    describe("getName", () => {
        it("Name is generated.", () => {
            const name = "Nick";
            const nameTest = new Engineer(name, "12", "email", "github");
            expect(nameTest.getName()).toBe(name);
        });
    });

    describe("getID", () => {
        it("ID is generated.", () => {
            const eId = "12";
            const idTest = new Engineer("Nick", eId, "email", "github");
            expect(idTest.getId()).toBe(eId);
        });
    });

    describe("getEmail", () => {
        it("Email is generated.", () => {
            const email = "test@gmail.com";
            const emailTest = new Engineer("Nick", "12", email, "github");
            expect(emailTest.getEmail()).toBe(email);
        });
    });

    describe("getGithub", () => {
        it("GitHub is generated.", () => {
            const github = "ncclymer";
            const githubTest = new Engineer("Nick", 12, "email", github);
            expect(githubTest.getGitHub()).toBe(github);
        });
    });

    describe("getRole", () => {
        it("Role is generated.", () => {
            const roleString = "Engineer";
            const roleTest = new Engineer("Nick", 1, "test@gmail.com", "github");
            expect(roleTest.getRole()).toBe(roleString);
        });
    });
});