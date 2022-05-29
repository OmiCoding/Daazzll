import jwt from "jsonwebtoken";


export const handleJWT = function(token: string, pubKey: string): Promise<string | jwt.JwtPayload | null> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, pubKey, function(err, decoded: any) {
      if(err) return reject(err);
      if(!decoded) return resolve(null);
      if(!decoded.tokenId) return resolve(null);
      
      
      return resolve(decoded);
    })
  })
};