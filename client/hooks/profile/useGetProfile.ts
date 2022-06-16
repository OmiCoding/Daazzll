import Cookies from "js-cookie"
import { useEffect } from "react"

<<<<<<< HEAD




=======
>>>>>>> main
const useGetProfile = function() {
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if(accessToken) {
<<<<<<< HEAD
      fetch("https://daazzll.local:8433/profile/medialinks", {
=======
      fetch("https://daazzll.local:8433/profile/setup", {
>>>>>>> main
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
<<<<<<< HEAD


=======
>>>>>>> main
  }, [])
}


export default useGetProfile;