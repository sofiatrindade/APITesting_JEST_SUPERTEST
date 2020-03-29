const request = require("supertest");
const ApiUrl = "https://localhost:8080/api";

describe("GET /users/{id}", () => {
  it("should return 200 and check user name is 'Sofia Trindade'", () => {
    return request(ApiUrl)
      .get("/users/12345")
      .expect(200)
      .then(response => {
        expect(response.body.name).toEqual("Sofia Trindade");
      });
  });

  it("should return 404 with 'The user was not found'", () => {
    return request(ApiUrl)
      .get("/users/121212")
      .expect(404)
      .then(response => {
        expect(response.body).toEqual("The user was not found");
      });
  }); 
});

describe("POST /users", () => {
  it("should return 200 and check user with name 'TestAPI' exist", () => {
    return request(ApiUrl)
      .post("/users")
      .send({ name:"TestAPI", jobTitle:"Test Engineer" })
      .expect(200)
      .then(() => {
        return request(ApiUrl)
        .get("/users")
        .query({ name:"TestAPI" })
        .expect(200)
      });
  });

  it("should return 400 because user name already exists", () => {
    return request(ApiUrl)
      .post("/users")
      .send({ name:"TestAPI", jobTitle:"Test Engineer" })
      .expect(400)
      .then(response => {
        expect(response.body).toEqual("The user name already exists");
      });
  }); 
});

describe("PUT /users/{id}", () => {
  it("should return 200 and check user was update to 'TestAPI'", () => {
    return request(ApiUrl)
      .put("/users/123456")
      .send({ name:"TestAPIEdited", jobTitle:"Test Engineer" })
      .expect(200)
      .then(() => {
        return request(ApiUrl)
        .get("/users")
        .query({ name:"TestAPIEdited" })
        .expect(200)
      });
  });
});

describe("Delete /users/{id}", () => {
  it("should return 200 and check user was not found", () => {
    return request(ApiUrl)
      .del("/users/123456")
      .expect(200)
      .then(() => {
        return request(ApiUrl)
        .del("/users/123456")
        .expect(404)
      });
  });
});
