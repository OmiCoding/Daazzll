import Cookies from "js-cookie"
import { useEffect } from "react"





const useGetProfile = function() {
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if(accessToken) {
      fetch("https://daazzll.local:8433/profile/medialinks", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }).then((data) => data.json())
      .then((res) => {
        console.log(res);
      })
    }
    // development path, change in production


  }, [])
}


export default useGetProfile;