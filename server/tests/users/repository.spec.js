// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const UserRepository = require("../../database/models/UserRepository");

// Test suite for UserRepository
describe("UserRepository", () => {
  // Test: Check if UserRepository extends AbstractRepository
  test("UserRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(UserRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.user is an instance of UserRepository
  test("tables.User = new UserRepository", async () => {
    // Assertions
    expect(tables.user instanceof UserRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'User' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake User data
    const fakeUser = {
      firstName: "toto",
      lastName: "titi",
      email: "toto.titi@tata.com",
      password: "password",
    };

    // Call the create method of the User repository
    const returned = await tables.user.create(fakeUser);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "insert into user (firstName, lastName, email, password) values (?, ?, ?, ?)",
      [fakeUser.firstName, fakeUser.lastName, fakeUser.email, fakeUser.password]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readAll method selects all data from the 'user' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the User repository
    const returned = await tables.user.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from user");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'User' table based on id
  test("read => select with id", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the User repository
    const returned = await tables.user.read(0);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from user where id = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
