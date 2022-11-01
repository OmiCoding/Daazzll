import React, { ChangeEvent, MouseEvent } from "react";
import AddDesignBtn from "./AddDesignBtn";
import useProfile from "../../../hooks/profile/useProfile";
import useApp from "../../../hooks/general/useApp";
import DesignsList from "./DesignsList";

const DesignContainer = function () {
  const { activeDesign, designs, design, resetDesign } = useProfile();
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

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    if (!design) return;
    const formData = new FormData();
    formData.append("design", design);
    formData.append("folder", "designs");

    fetch("/profile/designs", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        if (resetDesign) {
          resetDesign();
        }
      })
      .catch((err) => {
        console.error(err);
        if (resetDesign) {
          resetDesign();
        }
      });
  }

  return (
    <>
      <section className="design-section">
        <div className="design-max-wrapper">
          <section className="designs">
            <ol className="designs__list">
              <AddDesignBtn handleChange={handleChange} handleSubmit={handleSubmit} />
              <DesignsList designs={designs} handleClick={handleClick} />
            </ol>
          </section>
        </div>
      </section>
    </>
  );


  
};

export default DesignContainer;
