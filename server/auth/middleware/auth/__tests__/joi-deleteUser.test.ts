import express from "express";
import request from "supertest";
import { joiDeleteUser } from "../joiChecks";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/delete", joiDeleteUser);

test("Testing the middleware fails when there is no email or password.", (done) => {
  request(app)
    .post("/delete")
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the middleware fails when there is no email.", (done) => {
  request(app)
    .post("/delete")
    .set("Accept", "application/json")
    .send({
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the middleware fails when there is no password.", (done) => {
  request(app)
    .post("/delete")
    .set("Accept", "application/json")
    .send({
      email: "johndoe123@gmail.com",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the middleware fails when there is an invalid email.", (done) => {
  request(app)
    .post("/delete")
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

test("Testing the middleware fails when there is an invalid password.", (done) => {
  request(app)
    .post("/delete")
    .set("Accept", "application/json")
    .send({
      email: "johndoe123@gmail.com",
      password: "johndo",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that the middleware passes with valid credentials", (done) => {
  request(app)
    .post("/delete")
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
