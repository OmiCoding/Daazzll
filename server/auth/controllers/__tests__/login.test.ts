import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import request from "supertest";
import { testLogin } from "../../setups-for-tests/functions/prismaTestCRUD";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/login", testLogin);
describe("Testing the login route.", () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const password = await bcrypt.hash("johndoe123!", 10);

    await prisma.accounts.create({
      data: {
        id: 2,
        role: "user",
        fName: "John",
        lName: "Doe",
        email: "johndoe123@gmail.com",
        username: "johndoe123",
        pass: password,
      },
    });
  });

  afterAll(async () => {
    prisma.accounts.delete({
      where: {
        id: 2,
      },
    });
  });

  test("Testing the login route that it passes with valid email credentials.", (done) => {
    try {
      request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          email: "johndoe123@gmail.com",
          password: "johndoe123!",
        })
        .expect(302)
        .end(function (err, res) {
          if (err) return done(err);

          return done();
        });
    } catch (e) {
      throw e;
    }
  });

  test("Testing the login route that it passes with valid username credentials.", (done) => {
    try {
      request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          username: "johndoe123",
          password: "johndoe123!",
        })
        .expect(302)
        .end(function (err, res) {
          if (err) return done(err);

          return done();
        });
    } catch (e) {
      throw e;
    }
  });

  test("Testing the login route that it fails with invalid email.", (done) => {
    try {
      request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          email: "johndoe12gmail.com",
          password: "johndoe123!",
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          return done();
        });
    } catch (e) {
      throw e;
    }
  });

  test("Testing the login route that it fails with invalid username.", (done) => {
    try {
      request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          username: "johndoe12",
          password: "johndoe123!",
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          return done();
        });
    } catch (e) {
      throw e;
    }
  });

  test("Testing the login route that it fails with invalid password.", (done) => {
    try {
      request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          email: "johndoe123@gmail.com",
          password: "johndoe1!",
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          return done();
        });
    } catch (e) {
      throw e;
    }
  });
});
