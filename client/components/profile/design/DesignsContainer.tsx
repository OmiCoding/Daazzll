import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import AddDesignBtn from "./AddDesignBtn";
import useProfile from "../../../hooks/profile/useProfile";
import useApp from "../../../hooks/general/useApp";
import DesignsList from "./DesignsList";

const DesignContainer = function () {
  const { activeDesign, designs, setDesigns } = useProfile();
  const { handleModal } = useApp();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
     
    if (files) {
      if (activeDesign) {
        activeDesign(files[0]);
      }
    }
    e.target.value = "";
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>, url: string) {
    if (handleModal) {
      return handleModal(e, "design", {
        key: "design",
        url,
      });
    }
  }
  
  // Setup pagination here
  // useEffect(() => {
  //   if (setDesigns) {
  //     setDesigns();
  //   }
  // }, [setDesigns])

  return (
    <>
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
    </>
  );


  
};

export default DesignContainer;
