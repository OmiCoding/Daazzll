import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import supertest from "supertest";
import session from "express-session";
import { redisStore } from "../../../storageInit";
import { handleCookies } from "../../../setups-for-tests/functions/checkTokenTestFuncs";
import deleteSession from "../../../setups-for-tests/functions/deleteSession";
import { checkToken2 } from "../checkToken2";

import "dotenv/config";

let { SESSION_SECRET } = process.env;
if (!SESSION_SECRET) {
  SESSION_SECRET = "mysecret";
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "mysecret",
    store: redisStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      secure: false,
      httpOnly: false,
    },
  })
);
app.post("/pass", handleCookies, checkToken2);
app.post("/deleteSess", deleteSession);
// app.get("/checkSessions", checkSession)

let access_token: any, refresh_token: any, access_id: any, refresh_id: any;

// beforeAll(async () => {
//   const { accessToken, refreshToken, accessId, refreshId } = await setTokens("johndoe@gmail.com", "Johndoe123!");

// access_token = accessToken;
//   refresh_token = refreshToken;
//   access_id = accessId;
//   refresh_id = refreshId;
// })

// afterEach(async () => {
//   await supertest(app)
//   .post("/deleteSess")
//   .set("Accept", "application/json")
// })

describe("Testing the middleware checkToken that passes against the first three conditions", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  // beforeEach(() => {
  //   mockRequest = {
  //     cookies: {},
  //   };
  //   mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn()
  //   };
  // })

  // test("Testing the middleware checkToken to see it working properly", async () => {
  //   const expectedJson = {
  //     "msg": "Unauthenticated."
  //   };
  //   await checkToken2(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);
  //   expect(mockResponse.status).toBeCalledTimes(1);
  //   expect(mockResponse.json).toBeCalledWith(expectedJson);
  // })

  // test("Testing the middleware that it responds with a status of 401 with no refresh_token", async () => {
  //   mockRequest.cookies.access_token = "some invalidValue"
  //   const expectedJson = {
  //     "msg": "Unauthenticated."
  //   };

  //   await checkToken2(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);
  //   expect(mockResponse.status).toBeCalledTimes(1);
  //   expect(mockResponse.json).toBeCalledWith(expectedJson);
  // })

  test("Testing the middleware that it responds with a status of 200 correct credentials, and populates req.session with a user prop.", (done) => {
    //@ts-ignore
    // await supertest(app)
    // .get("/setSessions")

    supertest(app)
      .post("/pass")
      .end(function (err) {
        if (err) return done(err);

        return done();
      });
    // .send({
    //   access_token: access_token,
    //   refresh_token: refresh_token
    // })
    // .set("Accept", "application/json")
    // await supertest(app)
    // .post("/pass")
    // .send({
    //   access_token: accessToken,
    //   refresh_token: refreshToken
    // })

    // const accessId = uuidv4();
    // const refreshId = uuidv4();

    // const privKey = await fileRead(privPath, { encoding: "binary" });

    // const data = await prismaClient.accounts.findFirst({
    //   where: {
    //     email: "johndoe@gmail.com",
    //   },
    //   select: {
    //     id: true,
    //     email: true,
    //     username: true,
    //   }
    // })

    // const payload = {
    //   role: "user",
    //   tokenId: accessId,
    //   email: data?.email,
    //   username: data?.username,
    //  }

    // const setAccess = await redisClient.setEx(accessId, 600, JSON.stringify({ token: accessToken }));
    // const setRefresh = await redisClient.setEx(refreshId, 600, JSON.stringify({ token: refreshToken }));

    // await redisClient.setEx( accessId,
    //   600,
    //   JSON.stringify({ token: ace })
    // );

    // .end(function(err){
    //   supertest(app)
    //   .post("/pass")
    //   .set("Accept", "application/json")
    //   .end(function(err) {
    //     return done();
    //   })
    // })
  });
});

// describe("Testing the middleware checkToken related to scenarios with the access toekn", () => {
//   const app = express();
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }))
//   app.use(cookieParser())
//   app.use(session({
//     secret: "mysecret",
//     store: redisStore,
//     resave: false,
//     saveUninitialized: true,
//     cookie : {
//       path: "/",
//       secure: false,
//       httpOnly: true,
//     }
//   }));
//   app.post("/somepath", checkToken2);
//   app.post("/deleteSess", deleteSession)

// })

// test("Testing the middleware that it responds 401 with an invalid access token value.", async () => {
//   mockRequest.cookies.access_token = "someinvalidValue"
//   mockRequest.cookies.refresh_token = "someinvalidValue"
//   const expectedJson = {
//     "msg": "Unauthenticated."
//   }

//   await checkToken2(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);
//   expect(mockResponse.status).toBeCalledTimes(1);
//   expect(mockResponse.json).toBeCalledWith(expectedJson);
// });

// test("Testing the middleware that it redirects with both expired access token and refresh token", async () => {
//   try {
//     const accessId = uuidv4();
//     const refreshId = uuidv4();

//     const accessToken = jwt.sign(
//       {
//         role: "user",
//         userId: accessId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );

//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it redirects with expired access token and invalid refresh token.", async () => {
//   try {
//     const accessId = uuidv4();
//     const accessToken = jwt.sign(
//       {
//         role: "user",
//         userId: accessId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//         `refresh_token=sdfs; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it fails with when redis key doesn't match with refresh token, when there is a expired access token.", async () => {
//   try {
//     const accessId = uuidv4();
//     const refreshId = uuidv4();

//     const accessToken = jwt.sign(
//       {
//         role: "user",
//         userId: accessId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );

//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "30m",
//       }
//     );

//     await redisClient.setEx(
//       refreshId,
//       120,
//       JSON.stringify({ token: "secret" })
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middle that it fails with expired access token and no value for refresh token in redis.", async () => {
//   try {
//     const accessId = uuidv4();
//     const refreshId = uuidv4();
//     const accessToken = jwt.sign(
//       {
//         role: "user",
//         userId: accessId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );
//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "30m",
//       }
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it passes with correct crendetials that expired access token, and valid refresh token.", async () => {
//   try {
//     const accessId = uuidv4();
//     const refreshId = uuidv4();

//     const accessToken = jwt.sign(
//       {
//         role: "user",
//         userId: accessId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );

//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "30m",
//       }
//     );

//     await redisClient.setEx(
//       refreshId,
//       120,
//       JSON.stringify({ token: refreshToken })
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(404);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middle that it fails with access token but no value in redis.", async () => {
//   try {
//     const accessId = uuidv4();
//     const accessToken = jwt.sign(
//       {
//         role: "user",
//         userId: accessId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "30m",
//       }
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it fails with unmatching access tokens.", async () => {
//   try {
//     const accessId = uuidv4();
//     const accessToken = jwt.sign(
//       {
//         role: "user",
//         userId: accessId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "30m",
//       }
//     );

//     await redisClient.setEx(
//       accessId,
//       120,
//       JSON.stringify({ token: "secret" })
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it redirects with both expired tokens", async () => {
//   try {
//     const accessId = uuidv4();
//     const refreshId = uuidv4();

//     const accessToken = jwt.sign(
//       {
//         role: "user",
//         userId: accessId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );

//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `access_token=${accessToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it redirects to login with cookies not specified.", (done) => {
//   request(app)
//     .post("/somepath")
//     .set("Accept", "application/json")
//     .set("Cookie", ["somecookie=seioahsfohi"])
//     .expect(302)
//     .end(function (err, res) {
//       if (err) return done(err);

//       return done();
//     });
// });

// test("Testing the middleware that it redirects to login with no cookies.", (done) => {
//   request(app)
//     .post("/somepath")
//     .set("Accept", "application/json")
//     .expect(302)
//     .end(function (err, res) {
//       if (err) return done(err);

//       return done();
//     });
// });

// test("Testing the middleware that it fails with invalid jwt.", async () => {
//   try {
//     const refreshId = uuidv4();

//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "30m",
//       }
//     );

//     await redisClient.setEx(
//       refreshId,
//       180,
//       JSON.stringify({ token: refreshToken })
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `refresh_token=${refreshToken}d; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it fails with no payload, after jwt verify", async () => {
//   try {
//     const refreshId = uuidv4();

//     const refreshToken = jwt.sign({}, privateKey, {
//       algorithm: "RS256",
//       expiresIn: "30m",
//     });

//     await redisClient.setEx(
//       refreshId,
//       180,
//       JSON.stringify({ token: refreshToken })
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it fails with unmatching refresh tokens.", async () => {
//   try {
//     const refreshId = uuidv4();
//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "30m",
//       }
//     );

//     await redisClient.setEx(
//       refreshId,
//       180,
//       JSON.stringify({ token: "secret" })
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it fails with expired refresh token.", async () => {
//   try {
//     const refreshId = uuidv4();

//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "-30m",
//       }
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=Wed, 16 Feb 2022 22:09:47 GMT; SameSite=Strict`,
//       ])
//       .expect(302);
//   } catch (e) {
//     console.error(e);
//   }
// });

// test("Testing the middleware that it passes with correct refresh token credentials.", async () => {
//   try {
//     const refreshId = uuidv4();
//     const refreshToken = jwt.sign(
//       {
//         role: "user",
//         userId: refreshId,
//         email: "johndoe123@gmail.com",
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         expiresIn: "30m",
//       }
//     );

//     await redisClient.setEx(
//       refreshId,
//       180,
//       JSON.stringify({ token: refreshToken })
//     );

//     await request(app)
//       .post("/somepath")
//       .set("Accept", "application/json")
//       .set("Cookie", [
//         "",
//         `refresh_token=${refreshToken}; Path=/; HttpOnly; Expires=${new Date(
//           new Date().getTime() + 10 * 60000
//         ).toUTCString()}; SameSite=Strict`,
//       ])
//       .expect(404);
//   } catch (e) {
//     console.error(e);
//   }
// });
// });
