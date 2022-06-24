import cookieParser from "cookie-parser";
import express from "express";
import supertest from "supertest";
import "dotenv/config";
import {
  seeCookies,
  setupUserProp,
  testLogin,
} from "../../../setups-for-tests/functions/checkTokenTestFuncs";

const app = express();

app.use(cookieParser(process.env.USER_SECRET));
app.use(setupUserProp);

app.get("/checkMiddleware", function (req, res) {
  return res.send("Ok");
});

app.post("/login", testLogin);
app.post("/seeCookies", seeCookies);

describe("Testing the setup for user prop on the backend server", () => {
  test("Testing the setup of a cookie for the user prop", (done) => {
    supertest(app)
      .get("/checkMiddleware")
      .expect(200)
      .end(function (e, res) {
        if (e) return done(e);
        expect(res.header).toHaveProperty("set-cookie");
        const cookieVal = res.header["set-cookie"][0];

        expect(cookieVal).toMatch(/sid=mysecret;/);
        return done();
      });
  });

  test("Testing values related to the setup of the redis server", async () => {
    const loginRes = await supertest(app).post("/login").expect(200).send({});

    const headers = loginRes.headers["set-cookie"];

    const response = await supertest(app)
      .post("/seeCookies")
      .send({})
      .set("Cookie", `${headers[1]}`)
      .set("Accept", "application/json")
      .expect(200);

    const accObj = {
      role: "user",
      id: 1,
      email: "johndoe@gmail.com",
      username: "johndoe123",
    };

    const { signedCookie, redisData } = response.body;

    expect(signedCookie).toHaveProperty("sid");

    const parsedJSON = JSON.parse(redisData);

    expect(parsedJSON).toHaveProperty("id");

    expect(parsedJSON).toEqual(accObj);
  });
});
