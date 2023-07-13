import { app } from "../src/app.js";
import request from "supertest";

describe("Seed", () => {
  describe("GET /seed", () => {
    it("should return 200 OK", async () => {
      const response = await request(app).get("/seed");
      expect(response.status).toBe(200);
    });
  });
});

let authToken; // Variable para almacenar el token

describe("User", () => {
  describe("POST /api/v1/user/register", () => {
    it("should return 200 OK and store the token", async () => {
      const response = await request(app).post("/api/v1/user/register").send({
        username: "test",
        email: "test@test.com",
        password: "123456",
      });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      authToken = response.body.token;
    });

    it("should return 409 Conflict", async () => {
      const response = await request(app).post("/api/v1/user/register").send({
        username: "test",
        email: "test@test.com",
        password: "123456",
      });
      expect(response.status).toBe(409);
    });
  });

  describe("POST /api/v1/user/login", () => {
    it("should return 200 OK and store the token", async () => {
      const response = await request(app).post("/api/v1/user/login").send({
        email: "test@test.com",
        password: "123456",
      });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      authToken = response.body.token;
    });

    it("should return 404 Not Found", async () => {
      const response = await request(app).post("/api/v1/user/login").send({
        email: "testNotFound@test.com",
        password: "123456",
      });
      expect(response.status).toBe(404);
    });

    it("should return 401 Unauthorized", async () => {
      const response = await request(app).post("/api/v1/user/login").send({
        email: "test@test.com",
        password: "1234567",
      });
      expect(response.status).toBe(401);
    });
  });
});

describe("Book", () => {
  let book_id;

  describe("POST /api/v1/book", () => {
    it("should return 401 Unauthorized", async () => {
      const response = await request(app).post("/api/v1/book").send({
        title: "Test",
        author: "Test",
      });
      expect(response.status).toBe(401);
    });

    it("should return 200 OK", async () => {
      const response = await request(app)
        .post("/api/v1/book")
        .send({
          title: "Test",
          author: "Test",
        })
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      expect(response.body.book_id).toBeDefined();
      book_id = response.body.book_id;
    });
  });

  describe("DELETE /api/v1/book", () => {
    it("should return 401 Unauthorized", async () => {
      const response = await request(app).delete(`/api/v1/book/${book_id}`);
      expect(response.status).toBe(401);
    });

    it("should return 200 OK", async () => {
      const response = await request(app)
        .delete(`/api/v1/book/${book_id}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(204);
    });
  });
});
