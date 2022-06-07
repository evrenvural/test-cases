import "regenerator-runtime/runtime";
import request from "supertest";
import app from "../app";

describe("Feedback endpoints", () => {
  it("should get feedback list", async () => {
    const {
      body: { data, error },
      statusCode,
    } = await request(app).get("/feedback");

    expect(Array.isArray(data)).toBe(true);
    expect(error).toBeNull();
    expect(statusCode).toEqual(200);
  });

  it("should create a new feedback", async () => {
    const {
      body: { data, error },
      statusCode,
    } = await request(app).post("/feedback").send({
      content: "test is cool",
    });

    expect(data).toBe(true);
    expect(error).toBeNull();
    expect(statusCode).toEqual(201);
  });

  it("should not create a new feedback with empty content", async () => {
    const {
      body: { data, error },
      statusCode,
    } = await request(app).post("/feedback").send({
      content: "",
    });

    expect(data).toBeNull();
    expect(error).toStrictEqual({
      name: "ValidationError",
      message:
        "Feedback validation failed: content: Path `content` is required.",
    });
    expect(statusCode).toEqual(400);
  });
});
