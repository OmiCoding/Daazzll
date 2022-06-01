import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";
// import { assignUser } from "../../../setups-for-tests/functions/middlewareTestFuncs";
import { checkedLoggedIn } from "../checkedLoggedIn";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/somepath", checkedLoggedIn);

test("Testing that the middleware will check if there is a access token and that it redirects.", (done) => {
  request(app)
    .get("/somepath")
    .set("Accept", "application/json")
    .set("Cookie", [`access_token=oihdfoisdh;`])
    .expect(403)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that the middleware will check if there is a refresh token and that it redirects.", (done) => {
  request(app)
    .get("/somepath")
    .set("Accept", "application/json")
    .set("Cookie", [`access_token=oihdfoisdh;`])
    .expect(403)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that the middleware will return next if there is no tokens or user property.", (done) => {
  request(app)
    .get("/somepath")
    .set("Accept", "application/json")
    .expect(404)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});
