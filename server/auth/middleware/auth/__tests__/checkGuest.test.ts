import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";
import { checkGuest } from "../authChecks";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/somepath", checkGuest);

test("Testing the middleware that it skips when there appears to be a refresh token.", (done) => {
  request(app)
    .get("/somepath")
    .set("Accept", "application/json")
    .set("Cookie", [`refresh_token=sometoken;`])
    .expect(404)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the middleware that it skips when there appears to be an access token and refresh token.", (done) => {
  request(app)
    .get("/somepath")
    .set("Accept", "application/json")
    .set("Cookie", [`accept_token=dfgsdoghis;`, `refresh_token=hoiahfoiad;`])
    .expect(404)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing the middleware that it redirects to login when no tokens are present.", (done) => {
  request(app)
    .get("/somepath")
    .set("Accept", "application/json")
    .expect(302)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});
