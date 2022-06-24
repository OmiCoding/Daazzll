import express from "express";
import request from "supertest";
import { joiRegister } from "../joiRegister";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", joiRegister);

test("Testing the middleware joi-register that it fails with invalid first name.", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "1",
      lName: "Doe",
      username: "johndoe123",
      email: "johndoe123@gmail.com",
      pass: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-3414",
    })
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing the middleware joi-register that it fails with invalid last name", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "jo",
      lName: "d",
      username: "johndoe123",
      email: "johndoe123@gmail.com",
      pass: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-3414",
    })
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing the middleware joi-register that it fails with invalid username.", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "john",
      lName: "doe",
      username: "jo",
      email: "johndoe123@gmail.com",
      pass: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-3122",
    })
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing the middleware joi-register that it fails with invalid email.", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "john",
      lName: "doe",
      username: "johndoe123",
      email: "johndoegmail.com",
      pass: "johndoe123!",
      confirmPass: "johndoe123!",
      phone: "347-652-4132",
    })
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

test("Testing the middleware joi-register that it fails with invalid pass", (done) => {
  request(app)
    .post("/register")
    .send({
      fName: "john",
      lName: "doe",
      username: "johndoe123",
      email: "johndoe123@gmail.com",
      pass: "johndoe",
      confirmPass: "johndoe",
      phone: "347-643-8761",
    })
    .set("Accept", "application/json")
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

// test("Testing the middleware joi-register that it fails with invalid phone.", (done) => {
//   request(app)
//     .post("/register")
//     .send({
//       fName: "john",
//       lName: "doe",
//     })
//     .set("Accept", "application/json")
//     .expect(400)
//     .end(function (err, res) {
//       if (err) return done(err);

//       return done();
//     });
// });

// test("Testing the middleware joi-register that it fails with invalid email", (done) => {
//   request(app).post("/register").send({
//     fName: "",
//     lName: "",

//   })
//   .set("Accept", "application/json")
//   .expect(400)
//   .end(function(err, res) {
//     if(err) done(err)

//     return done()
//   });
// });

// test("Testing the middleware joi-register that it fails with invalid email.", (done) => {
//   request(app).post("/register").send({
//     fName: "",
//     lName: "",
//     username: "",
//   });
// });
