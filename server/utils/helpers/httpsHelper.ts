import path from "path";

interface HelperProps {
  key: string;
  cert: string;
  ca?: string;
}

const httpsHelper = function(build: string): HelperProps {
  if(build === "dev" || build === "test") {
    return {
      key: path.join(__dirname + "/../../../certs/daazzll.dev+3-key.pem"),
      cert: path.join(__dirname + "/../../../certs/daazzll.dev+3.pem"),
    };
  } else {
    return {
      key: path.join("/etc/letsencrypt/live/daazzll.com/privkey.pem"),
      cert: path.join("/etc/letsencrypt/live/daazzll.com/cert.pem"),
      ca: path.join("/etc/letsencrypt/live/daazzll.com/fullchain.pem"),
    };
  }
}

export default httpsHelper;