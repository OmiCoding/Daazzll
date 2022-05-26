// const fs = require("fs");
const CryptoJS = require("crypto-js");
// const path = require("path");
// const uuid = require("uuid");
// // const keyFile = require("./server/auth/keys/jwtRS256.key");

// const { v4 } = uuid;
// const privKey = fs.readFileSync("./server/auth/keys/jwtRS256.key", "binary");
// const key = CryptoJS.enc.Utf8.parse(privKey);
// const iv = CryptoJS.enc.Utf8.parse(v4());
// const serializedState = JSON.stringify({
//   someitem: "jsdkfs",
// });

// const encrypted = CryptoJS.AES.encrypt(serializedState, key, { iv: iv });
// const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv }).toString(
//   CryptoJS.enc.Utf8
// );

// // console.log(encrypted);
// console.log(decrypted);

// function generateKey(p){
//   var salt = CryptoJS.lib.WordArray.random(128/8);
//   return CryptoJS.PBKDF2(p, salt, { keySize: 512/32, iterations: 1000 });
// }

// var message = "some_secret_message";

// var key = "6Le0DgMTAAAAANokdEEial"; //length=22
// var iv = "mHGFxENnZLbienLyANoi.e"; //length=22

// key = CryptoJS.enc.Base64.parse(generateKey(message));
// //key is now e8b7b40e031300000000da247441226a, length=32
// iv = CryptoJS.enc.Base64.parse(iv);
// //iv is now 987185c4436764b6e27a72f2fffffffd, length=32

// var cipherData = CryptoJS.AES.encrypt(message, key, { iv: iv });

// var data = CryptoJS.AES.decrypt(cipherData, key, { iv: iv }).toString(
//   CryptoJS.enc.Utf8
// );
// //data contains "some_secret_message"

// console.log(data);

console.log(new Date(new Date().getTime() + 1 * 60000));
