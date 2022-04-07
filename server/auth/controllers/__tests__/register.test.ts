import express from "express";
import request from "supertest";
import {
  testRegister,
  registerFoundUser,
} from "../../setups-for-tests/functions/prismaTestCRUD";
// @ts-ignore: Unreachable code error
import prisma from "../../prismaClient";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/register", testRegister);
app.post("/registerFoundAcc", registerFoundUser);

describe("Testing the register route", () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        id: 1,
        role: "user",
        fName: "Dave",
        lName: "Buster",
        email: "davebuster123@gmail.com",
        username: "davebuster123",
        pass: "davebuster123!",
      },
    });
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: 1,
      },
    });
  });

  test("Testing the register route with valid credentials.", (done) => {
    request(app)
      .post("/register")
      .set("Accept", "application/json")
      .send({
        fName: "Dave",
        lName: "Buster",
        email: "davebuster123@gmail.com",
        username: "davebuster123",
        password: "davebuster123!",
        phone: "917-542-1231",
      })
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);
        if (!res.headers["set-cookie"]) {
          throw new Error("set-cookie header undefined.");
        }

        const headers = res.headers["set-cookie"];
        expect(res.headers["set-cookie"].length).toEqual(2);

        const regex1 = /access_token/;
        const regex2 = /refresh_token/;

        for (let i = 0; headers.length < 2; i++) {
          let item = headers[i].match(regex1);
          if (item.length > 1) {
            expect(item[0]).toBe("access_token");
          } else {
            expect(headers[i].match(regex2)[0]).toBe("refresh_token");
          }
        }

        expect(regex1.test(headers[0])).toBe(true);
        expect(regex2.test(headers[1])).toBe(true);

        return done();
      });
  });

  // test("Testing the register route that it fails with an existing user.", (done) => {
  //   request(app)
  //     .post("/registerFoundAcc")
  //     .set("Accept", "application/json")
  //     .send({
  //       fName: "Dave",
  //       lName: "Buster",
  //       username: "davebuster123",
  //       email: "davebuster123@gmail.com",
  //       password: "davebuster123!",
  //       phone: "917-432-7431",
  //     })
  //     .expect(400)
  //     .end(function (err, res) {
  //       if (err) return done(err);

  //       return done();
  //     });
  // });
});
