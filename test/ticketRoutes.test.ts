import request from "supertest";
import app from "../src/app";

describe("Ticket API", () => {
  it("should create a ticket", async () => {
    const res = await request(app).post("/api/v1/tickets").send({
      title: "Test",
      description: "Test desc",
      priority: "low",
    });
    expect(res.status).toBe(201);
  });

  it("should return 400 on missing title", async () => {
    const res = await request(app).post("/api/v1/tickets").send({});
    expect(res.status).toBe(400);
  });
});
