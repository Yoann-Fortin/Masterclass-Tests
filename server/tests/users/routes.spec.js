// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the GET /api/users route
describe("GET /api/users", () => {
  it("should fetch users successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/items endpoint
    const response = await request(app).get("/api/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/users/:id route
describe("GET /api/users/:id", () => {
  it("should fetch a single user successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/items/:id endpoint
    const response = await request(app).get("/api/users/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should return 404 for non-existent item", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).get("/api/items/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/users route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/users", () => {
  it("should add a new user successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data
    const fakeUser = {
      firstName: "toto",
      lastname: "titi",
      email: "toto.titi@tata.com",
      password: "password",
    };

    // Send a POST request to the /api/items endpoint with a test item
    const response = await request(app).post("/api/users").send(fakeUser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});

// TODO: test PUT and DELETE routes
