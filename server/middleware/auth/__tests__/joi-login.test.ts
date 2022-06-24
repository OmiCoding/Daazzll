import express from "express";
import request from "supertest";
import { joiLogin } from "../joiLogin";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/login", joiLogin);

test("Testing the joi-login middleware with valid credentials", (done) => {
  request(app)
    .post("/login")
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

test("Testing the joi-login middleware that it fails with invalid email.", (done) => {
  request(app)
    .post("/login")
    .set("Accept", "application/json")
    .send({
      email: "john doe123@gmail.com",
      password: "johndoe123!",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the joi-login middleware that it fails with invalid password.", (done) => {
  request(app)
    .post("/login")
    .set("Accept", "application/json")
    .send({
      email: "johndoe123@gmail.com",
      password: "johndoe",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});
