// const { createClient } = require("redis");

const path = require("path");

// redisClient = createClient({
//   url: `redis://daazzll.local:6379`,
// });

// (async () => {
//   await redisClient.connect();

//   await redisClient.setEx("apple", 120, JSON.stringify({ msg: "hello" }));

//   console.log(await redisClient.get("apple"));
// })();
console.log(path.join(__dirname + "/.."));
