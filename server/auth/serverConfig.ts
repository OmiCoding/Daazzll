export const ISSUER = "mobile-server";
export const TOKEN_LIFESPAN = 1800;
export const PUB_KEY_PATH =
  process.env.BUILD !== "dev"
    ? "/home/node/src/keys/jwtRS256.key.pub"
    : __dirname + "/../../keys/jwtRS256.key.pub";
export const PRIV_KEY_PATH =
  process.env.BUILD !== "dev"
    ? "/home/node/src/keys/jwtRS256.key"
    : __dirname + "/../../keys/jwtRS256.key";
