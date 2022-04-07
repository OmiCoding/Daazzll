import express from "express";
import request from "supertest";
import { deleteUser } from "../authControllers";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/delete", deleteUser);

describe("Testing the deleteUser controller", () => {
  beforeAll(async () => {
    const prisma = new PrismaClient();
    await prisma.user.create({
      data: {
        role: "user",
        fName: "Hank",
        lName: "Hill",
        username: "hankhill123",
        email: "hankhill123@gmail.com",
        pass: await bcrypt.hash("hankhill123!", 10),
      },
    });
  });

  test("Test that the deleteUser controller fails when no user exists.", (done) => {
    request(app)
      .post("/delete")
      .set("Accept", "application/json")
      .expect(400)
      .send({
        email: "bobbyhill123@gmail.com",
        password: "bobbyhill123!",
      })
      .end(function (err, res) {
        if (err) return done(err);

        return done();
      });
  });

  // test("Test that the deleteUser controller fails when it is the wrong password.", (done) => {
  //   request(app)
  //     .post("/delete")
  //     .set("Accept", "application/json")
  //     .expect(400)
  //     .send({
  //       email: "hankhill123@gmail.com",
  //       password: "hankhl123!",
  //     })
  //     .end(function (err, res) {
  //       if (err) return done(err);

  //       return done();
  //     });
  // });

  // test("Test that the deleteUser controller fails when it is the wrong password.", (done) => {
  //   request(app)
  //     .post("/delete")
  //     .set("Accept", "application/json")
  //     .expect(302)
  //     .send({
  //       email: "hankhill123@gmail.com",
  //       password: "hankhill123!",
  //     })
  //     .end(function (err, res) {
  //       if (err) return done(err);

  //       return done();
  //     });
  // });
});
