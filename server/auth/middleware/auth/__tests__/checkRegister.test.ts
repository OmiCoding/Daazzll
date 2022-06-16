import request from "supertest";
import express from "express";
import { checkRegister } from "../checkRegister";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/register", checkRegister);
// Expect 404 since the next() function can't find where to continue the request
test("Testing middleware checkRegister to see that it passes with valid request", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "john",
      lName: "doe",
      username: "johndoe123",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-3414",
    })
    .set("Accept", "application/json")
    .expect(404)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing middleware checkRegister to see that it fails with invalid first name", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "joh n",
      lName: "doe",
      username: "johndoe123",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-3414",
    })
    .set("Accept", "application/json")
    .expect(400)
    .expect({ msg: "No whitespace characters allowed." })
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing middleware checkRegister to see that it fails with invalid last name", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "john",
      lName: "do$e",
      username: "johndoe123",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-3414",
    })
    .set("Accept", "application/json")
    .expect(400)
    .expect({ msg: "No special characters allowed.\n Ex: @#$%^!&*" })
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing middleware checkRegister to see that it fails with invalid username.", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "john",
      lName: "doe",
      username: "jo hndoe123",
      email: "johndoe123@gmail.com",
      password: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-3414",
    })
    .set("Accept", "application/json")
    .expect(400)
    .expect({ msg: "No whitespace characters allowed." })
    .end(function (err, res) {

      if (err) return done(err);

      return done();
    });
});

test("Testing middleware checkRegister to see that it fails with invalid email.", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "john",
      lName: "doe",
      username: "johndoe123",
      email: "johndoe123gmail.com",
      password: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-3414",
    })
    .set("Accept", "application/json")
    .expect(400)
    .expect({ msg: "Invalid email." })
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing middleware checkRegister to see that it fails with invalid pass.", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "john",
      lName: "doe",
      username: "johndoe123",
      email: "johndoe123@gmail.com",
      password: "johndoe12!",
      confirmPass: "johndoe123!",
      phone: "347-652-3414",
    })
    .set("Accept", "application/json")
    .expect(400)
    .expect({ msg: "Passwords do not match." })
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});