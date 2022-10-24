import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import DesignCard from "./DesignCard";
import AddDesignBtn from "./AddDesignBtn";
import useProfile from "../../../hooks/profile/useProfile";
import useApp from "../../../hooks/general/useApp";
import DesignsList from "./DesignsList";

interface DataResponse {
  imgs: string[];
  cursor: number | null;
  msg: string;
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
      fetch(`/profile/designs?cursor=${count}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((data) => data.json())
      .then(async (res) => {

        const { imgs, cursor }: DataResponse = res;
        
        console.log(imgs);

        if (imgs.length > 5 && 
          count !== cursor && 
          cursor !== null) {
          setCount(cursor);
        }
        setDesigns(imgs);
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
    
  }, [count, designs, designLoad, dispatch])

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
