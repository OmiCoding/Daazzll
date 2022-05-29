import { RedisStore } from "connect-redis";
import { ReqUser } from "../../custom-types";

export const handleSession = function(method: string, store: RedisStore, payload?: ReqUser): Promise<void> {
  return new Promise((resolve, reject) => {
    if(!store) throw new Error("Store is not defined...");
    if(!store.all) throw new Error("The all method does not exist...");
    store.all(function(e: any, sessions: any) {
      if(e) console.error(e);
      if(!sessions) return;
      let session;
      for(let i=0; i < sessions.length; i++) {
        if(sessions[i].name === "sess1") {
          session = sessions[i];
          break;
        }
      }
  
      switch(method) {
        case "ADD":
        case "UPDATE":
          session.user = {...payload}
          store.set(session.id, session, function(e) {
            if(e) {
              console.error(e);
              throw new Error("Something has gone wrong...");
            }
            resolve();
          });
        case "DELETE":
          store.destroy(session.id, function(e) {
            if(e) new Error("Something has gone wrong...");
            resolve();
          });
        default:
          reject();
      }
    });
  });

}