import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import DesignCard from "./DesignCard";
import AddDesignBtn from "./AddDesignBtn";
import useProfile from "../../../hooks/profile/useProfile";
import useApp from "../../../hooks/general/useApp";
import DesignsList from "./DesignsList";


interface DesignObj {
  url: string;
}

const DesignContainer = function () {
  const { activeDesign, designLoad, dispatch } = useProfile();
  const { handleModal } = useApp();
  const [designs, setDesigns] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
     
    if (files) {
      if (activeDesign) {
        activeDesign(files[0]);
      }
    }
    e.target.value = "";
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (handleModal) {
      return handleModal(e, "design");
    }
  }

  useEffect(() => {
    if(designLoad) {
      fetch(`/profile/designs?count=${count}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((data) => data.json())
      .then(async (res) => {
        const data: DesignObj[] = res.data;
        const dataArr: string[] = [];

        for await (const urlObj of data) {
          try {
            const { url } = await fetch(urlObj.url);
            dataArr.push(url);
          } catch(e) {
            console.error(e);
          }
        } 

        if (designs.length < 5) {
          setCount(0)
        } else {
          setCount(5);
        }
        setDesigns(dataArr);
        if (dispatch) {
          dispatch({
            type: "DONE_LOAD",
          })
        }
      }) 
      .catch((err) => {
        console.log(err);
      })
  
    }
    
  }, [designLoad, dispatch])
  

  console.log(designs);

  return (
    <section className="design-section">
      <div className="design-max-wrapper">
        <section className="designs">
          <ol className="designs__list">
            <AddDesignBtn handleChange={handleChange} />
            <DesignsList designs={designs} handleClick={handleClick} />
          </ol>
        </section>
      </div>
    </section>
  );


  
};

export default DesignContainer;
