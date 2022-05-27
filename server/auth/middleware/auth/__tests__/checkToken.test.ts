import fs from "fs";
import path from "path";
import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../../../storageInit";

import checkToken from "../checkToken";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/somepath", checkToken);

describe("Testing the middleware checkToken that passes against these tests.", () => {
  const privateKey = fs.readFileSync(
    path.resolve("server/auth/keys/jwtRS256.key"),
    "binary"
  );

  test("Testing the middleware that it redirects with an invalid access token value.", (done) => {
    request(app)
      .post("/somepath")
      .set("Accept", "application/json")
      .set("Cookie", [`access_token=invalidvalue;`])
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);

        return done();
      });
  });

  test("Testing the middleware that it redirects with both expired access token and refresh token", async () => {
    try {
      const accessId = uuidv4();
      const refreshId = uuidv4();

      const accessToken = jwt.sign(
        {
          role: "user",
          userId: accessId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );

      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it redirects with expired access token and invalid refresh token.", async () => {
    try {
      const accessId = uuidv4();
      const accessToken = jwt.sign(
        {
          role: "user",
          userId: accessId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
          `refresh_token=sdfs; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it fails with when redis key doesn't match with refresh token, when there is a expired access token.", async () => {
    try {
      const accessId = uuidv4();
      const refreshId = uuidv4();

      const accessToken = jwt.sign(
        {
          role: "user",
          userId: accessId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );

      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "30m",
        }
      );

      await redisClient.setEx(
        refreshId,
        120,
        JSON.stringify({ token: "secret" })
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middle that it fails with expired access token and no value for refresh token in redis.", async () => {
    try {
      const accessId = uuidv4();
      const refreshId = uuidv4();
      const accessToken = jwt.sign(
        {
          role: "user",
          userId: accessId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );
      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "30m",
        }
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it passes with correct crendetials that expired access token, and valid refresh token.", async () => {
    try {
      const accessId = uuidv4();
      const refreshId = uuidv4();

      const accessToken = jwt.sign(
        {
          role: "user",
          userId: accessId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );

      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "30m",
        }
      );

      await redisClient.setEx(
        refreshId,
        120,
        JSON.stringify({ token: refreshToken })
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(404);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middle that it fails with access token but no value in redis.", async () => {
    try {
      const accessId = uuidv4();
      const accessToken = jwt.sign(
        {
          role: "user",
          userId: accessId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "30m",
        }
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it fails with unmatching access tokens.", async () => {
    try {
      const accessId = uuidv4();
      const accessToken = jwt.sign(
        {
          role: "user",
          userId: accessId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "30m",
        }
      );

      await redisClient.setEx(
        accessId,
        120,
        JSON.stringify({ token: "secret" })
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it redirects with both expired tokens", async () => {
    try {
      const accessId = uuidv4();
      const refreshId = uuidv4();

      const accessToken = jwt.sign(
        {
          role: "user",
          userId: accessId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );

      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it redirects to login with cookies not specified.", (done) => {
    request(app)
      .post("/somepath")
      .set("Accept", "application/json")
      .set("Cookie", ["somecookie=seioahsfohi"])
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);

        return done();
      });
  });

  test("Testing the middleware that it redirects to login with no cookies.", (done) => {
    request(app)
      .post("/somepath")
      .set("Accept", "application/json")
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);

        return done();
      });
  });

  test("Testing the middleware that it fails with invalid jwt.", async () => {
    try {
      const refreshId = uuidv4();

      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "30m",
        }
      );

      await redisClient.setEx(
        refreshId,
        180,
        JSON.stringify({ token: refreshToken })
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `refresh_token=${refreshToken}d; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it fails with no payload, after jwt verify", async () => {
    try {
      const refreshId = uuidv4();

      const refreshToken = jwt.sign({}, privateKey, {
        algorithm: "RS256",
        expiresIn: "30m",
      });

      await redisClient.setEx(
        refreshId,
        180,
        JSON.stringify({ token: refreshToken })
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it fails with unmatching refresh tokens.", async () => {
    try {
      const refreshId = uuidv4();
      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "30m",
        }
      );

      await redisClient.setEx(
        refreshId,
        180,
        JSON.stringify({ token: "secret" })
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it fails with expired refresh token.", async () => {
    try {
      const refreshId = uuidv4();

      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "-30m",
        }
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=Wed, 16 Feb 2022 22:09:47 GMT; SameSite=Strict`,
        ])
        .expect(302);
    } catch (e) {
      console.error(e);
    }
  });

  test("Testing the middleware that it passes with correct refresh token credentials.", async () => {
    try {
      const refreshId = uuidv4();
      const refreshToken = jwt.sign(
        {
          role: "user",
          userId: refreshId,
          email: "johndoe123@gmail.com",
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "30m",
        }
      );

      await redisClient.setEx(
        refreshId,
        180,
        JSON.stringify({ token: refreshToken })
      );

      await request(app)
        .post("/somepath")
        .set("Accept", "application/json")
        .set("Cookie", [
          "",
          `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
            new Date().getTime() + 10 * 60000
          ).toUTCString()}; SameSite=Strict`,
        ])
        .expect(404);
    } catch (e) {
      console.error(e);
    }
  });
});
