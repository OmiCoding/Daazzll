import express from "express";
import request from "supertest";
import { joiUpdateUser } from "../joiUpdateUser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/update", joiUpdateUser);

test("Testing the joi middlware joiUpdateUser that it fails when req.body is empty.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing the joi middlware joiUpdateUser that it fails when there is no email or password.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      fName: "Rubert",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the joi middlware joiUpdateUser that it fails when there is an invalid email.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      fName: "Rubert",
      email: "johndoe123gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the joi middlware joiUpdateUser that it fails when there is an invalid password.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      fName: "Rubert",
      email: "johndoe123@gmail.com",
      password: "johndo",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the joi middlware joiUpdateUser that it fails when there is an invalid fName.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      fName: "R",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the joi middlware joiUpdateUser that it fails when there is an invalid lName.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      lName: "E",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the joi middlware joiUpdateUser that it fails when there is an invalid user.", (done) => {
  request(app)
    .post("/update")
    .set("Accept", "application/json")
    .send({
      username: "Ee",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the joi middleware joiUpdateUser that is passes with valid credentials", (done) => {
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
