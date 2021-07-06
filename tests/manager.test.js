const Manager = require('../lib/Manager');

describe("Manager", () => {
    describe("getName", () => {
        it('Name is generated.', () => {
            const name = 'Kelsey';
            const nameTest = new Manager(name, 12, 'email', 'on');
            expect(nameTest.getName()).toBe(name);
        });
    });

    describe("getID", () => {
        it('ID is generated.', () => {
            const eId = '12';
            const idTest = new Manager('Kelsey', eId, 'email', 'on');
            expect(idTest.getId()).toBe(eId);
        });
    });

    describe("getEmail", () => {
        it('Email is generated.', () => {
            const email = 'test@gmail.com';
            const emailTest = new Manager('Kelsey', 12, email, 'on');
            expect(emailTest.getEmail()).toBe(email);
        })
    });

    describe("getPhone", () => {
        it('Phone number is generated.', () => {
            const officeNumber = 1;
            const officeNumberTest = new Manager('Kelsey', 12, 'email', 1);
            expect(officeNumberTest.getOfficeNumber()).toBe(officeNumber);
        })
    });

    describe("getRole", () => {
        it('Role is generated.', () => {
            const roleString = 'Manager';
            const roleTest = new Manager('Kelsey', 32, 'test@gmail.com', 1);
            expect(roleTest.getRole()).toBe(roleString);
        });
    });

});