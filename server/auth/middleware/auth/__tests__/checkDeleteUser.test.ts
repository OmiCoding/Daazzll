import express from "express";
import request from "supertest";
import { checkDeleteUser } from "../checkDeleteUser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/delete", checkDeleteUser);

test("Testing that the middleware fails when there is no email and password.", (done) => {
  request(app)
    .post("/delete")
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing that the middleware fails when there is an email, but no password.", (done) => {
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
test("Testing that the middleware fails when there is a password, but no email.", (done) => {
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

test("Testing that the middleware fails when there is an invalid email.", (done) => {
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

test("Testing that the middleware fails when there is an invalid password.", (done) => {
  request(app)
    .post("/delete")
    .set("Accept", "application/json")
    .send({
      email: "johndoe123@gmail.com",
      password: "johnd",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing that the middleware passes when there is valid credentials.", (done) => {
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
