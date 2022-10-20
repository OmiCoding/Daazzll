import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import DesignCard from "./DesignCard";
import AddDesignBtn from "./AddDesignBtn";
import useProfile from "../../../hooks/profile/useProfile";
import useApp from "../../../hooks/general/useApp";

const arr = [1, 2, 3];

interface DesignObj {
  url: string;
}

const DesignContainer = function () {
  const { activeDesign, designLoad, doneLoad } = useProfile();
  const { handleModal } = useApp();
  const [designs, setDesigns] = useState(null);

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
      fetch("/profile/designs", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((data) => data.json())
      .then(async (res) => {
        if(res.data) {
          const dataArr: any = [];
          
          // const result = await res.data.forEach(async (elem: DesignObj) => {
          //   const imgData = await fetch(elem.url);
          //   dataArr.push(imgData);
            
          if(doneLoad) {
            doneLoad();
          }
        }
      }) 
      .catch((err) => {
        console.log(err);
      })
  
    }
    
  }, [designLoad])

  return (
    <section className="design-section">
      <div className="design-max-wrapper">
        <section className="designs">
          <ol className="designs__list">
            <AddDesignBtn handleChange={handleChange} />
            {arr.map((elem, ind) => {
              return (
                <DesignCard key={ind} elem={elem} handleClick={handleClick} />
              );
            })}
          </ol>
        </section>
      </div>
    </section>
  );
};

export default DesignContainer;
