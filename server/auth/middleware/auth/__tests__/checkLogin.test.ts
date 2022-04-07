import express from "express";
import request from "supertest";
import { checkLogin } from "../authChecks";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/login", checkLogin);

test("Testing the middleware checkLogin that it passes with correct credentials.", (done) => {
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

test("Testing the middleware checkLogin that it fails with invalid email.", (done) => {
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

test("Testing the middleware checkLogin that it fails with invalid password", (done) => {
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
