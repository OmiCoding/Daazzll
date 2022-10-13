import { useEffect } from "react";

function useGetDesigns() {
  useEffect(() => {
    fetch("/designs", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
}
