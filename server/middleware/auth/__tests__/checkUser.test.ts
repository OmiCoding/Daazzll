import express from "express";
import request from "supertest";
import { assignUser } from "../../../setups-for-tests/functions/middlewareTestFuncs";
import { checkUser } from "../checkUser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/onepath", assignUser, checkUser);
app.get("/twopath", checkUser);

test("Testing that you will be redirected when user prpoerty exists.", (done) => {
  request(app)
    .get("/onepath")
    .set("Accept", "application/json")
    .expect(404)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});

test("Testing that you will be redirected to login when when user property does not exist.", (done) => {
  request(app)
    .get("/twopath")
    .set("Accept", "application/json")
    .expect(302)
    .end(function (err, res) {
      if (err) return done(err);

      return done();
    });
});
