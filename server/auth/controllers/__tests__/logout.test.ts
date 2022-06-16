import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import { logout } from "../authControllers";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.post("/logout", logout);

test("Testing that the logout function runs as expected without any tokens", (done) => {
  request(app)
    .post("/logout")
    .set("Accept", "application/json")
    .expect(302)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that the logout runs as expected.", (done) => {
  const accessToken = jwt.sign(
    {
      greet: "hello",
    },
    "secret",
    {
      expiresIn: "10m",
    }
  );

  const refreshToken = jwt.sign({ greet: "hello" }, "secret", {
    expiresIn: "30m",
  });

  request(app)
    .post("/logout")
    .set("Accept", "application/json")
    .set("Cookie", [
      `access_token=${accessToken}; Path=/; HttpOnly; SameSite=Strict`,
      `refresh_token=${refreshToken}; Path=/; HttpOnly; SameSite=Strict`,
    ])
    .expect(302)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});
