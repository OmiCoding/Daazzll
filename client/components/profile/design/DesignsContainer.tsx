import React, { ChangeEvent, MouseEvent } from "react";
import DesignCard from "./DesignCard";
import AddDesignBtn from "./AddDesignBtn";
import useProfile from "../../../hooks/profile/useProfile";
import useApp from "../../../hooks/general/useApp";

const arr = [1, 2, 3];

const DesignContainer = function () {
  const { activeDesign, design } = useProfile();
  const { handleModal } = useApp();

  console.log(design);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.target;
    if (files) {
      if (activeDesign) {
        return activeDesign(files[0]);
      }
    }
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (handleModal) {
      return handleModal(e, "design");
    }
  }

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
