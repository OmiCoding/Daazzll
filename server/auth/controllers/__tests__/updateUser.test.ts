import { PrismaClient } from "@prisma/client";
import express from "express";
import request from "supertest";
import bcrypt from "bcrypt";
import { updateUser } from "../authControllers";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/update", updateUser);

describe("Testing the update User controller", () => {
  beforeAll(async () => {
    const prisma = new PrismaClient();

    await prisma.user.create({
      data: {
        role: "user",
        fName: "Jose",
        lName: "Juarez",
        username: "JoseIsCool123",
        email: "joseishere123@gmail.com",
        pass: await bcrypt.hash("joseishere123!", 10),
      },
    });
  });

  test("Testing the updateUser controller that it fails where the user doesn't exist", (done) => {
    request(app)
      .post("/update")
      .set("Accept", "application/json")
      .send({
        fName: "Juan",
        lName: "Gomez",
        username: "JoseIsCool123",
        email: "juangomez123@gmail.com",
        password: "joseishere123!",
      })
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);

        return done();
      });
  });

  test("Testing the updateUser controller that it fails with an invalid password.", (done) => {
    request(app)
      .post("/update")
      .set("Accept", "application/json")
      .send({
        fName: "Juan",
        lName: "Gomez",
        username: "theultimatedude1234",
        email: "joseishere123@gmail.com",
        password: "joseisher",
      })
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);

        return done();
      });
  });

  test("Testing the updateUser controller that it passes with valid credentials", (done) => {
    request(app)
      .post("/update")
      .set("Accept", "application/json")
      .send({
        fName: "Juan",
        lName: "Gomez",
        username: "theultimatedude1234",
        email: "joseishere123@gmail.com",
        password: "joseishere123!",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        return done();
      });
  });
});
