const { createClient } = require("redis");

redisClient = createClient({
  url: `redis://daazzll.local:6379`,
});

(async () => {
  await redisClient.connect();

  await redisClient.setEx("apple", 120, JSON.stringify({ msg: "hello" }));

  console.log(await redisClient.get("apple"));
})();
