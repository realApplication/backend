"use strict";
const server = require("../server");
// I do not have to run it
const supertest = require("supertest");
const request = supertest(server.app);

//add the name of the module that I am testing
describe("my API Server", () => {
  it("handles my internal server errors", async () => {
    const response = await request.get("/pickedbook"); // async
    expect(response.status).toEqual(500);
  });

  it("pickedbook ", async () => {
    const response = await request.get("/pickedbook"); // async
    expect(typeof request.get("/pickedbook")).toEqual("object"); // superagent is behind this
  });

  it("Ask Help ", async () => {
    const response = await request.get("/askHelp"); // async
    expect(typeof request.get("/askHelp")).toEqual("object"); // superagent is behind this
  });

  it("/ pickedbook/:id", async () => {
    const response = await request.post("/pickedbook/1"); // async
    expect(response.status).toEqual(500);
    expect(typeof request.post("/pickedbook/1")).toEqual("object");
  });

  it("/ pickedbook/:id", async () => {
    const response = await request.delete("/pickedbook/1"); // async
    expect(response.status).toEqual(500);
    expect(typeof request.post("/pickedbook/1")).toEqual("object");
  });
});