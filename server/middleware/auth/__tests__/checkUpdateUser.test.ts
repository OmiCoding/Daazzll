import express from "express";
import request from "supertest";
import { checkUpdateUser } from "../checkUpdateUser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/update", checkUpdateUser);

test("Testing that the middleware fails with an empty req.body.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing that the middleware fails with less than 2 properties.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      fName: "Doe",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing that the middleware fails with no email and password.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({})
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing that the middleware fails with invalid password", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      fName: "Doe",
      email: "johndoe123@gmail.com",
      password: "3",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing that the middleware fails with a invalid fName", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      fName: "D oe",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that the middleware fails with a invalid lName", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      lName: "D oe",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that the middleware fails with a invalid email.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      email: "johndoe123gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that the middleware fails with a invalid username.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      username: "johnd oe123",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that the middleware passes with valid credentials", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
    })
    .expect(404)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});
