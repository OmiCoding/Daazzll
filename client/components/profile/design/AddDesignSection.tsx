import React, { useState, MouseEvent } from "react";
import NavList from "./NavList";
import DesignsContainer from "./DesignsContainer";
import "../../../styles/profile/design.css";

const AddDesignSection = function () {
  const [list, setList] = useState("Gifs");

  const handleList = function (e: MouseEvent<HTMLAnchorElement>, str: string) {
    if (str) setList(str);
  };

  return (
    <>
      <section className="nav-section">
        <div className="max-wrapper">
          <NavList list={list} setList={setList} handleList={handleList} />
          <div className="border" />
        </div>
      </section>
      <DesignsContainer />
    </>
  );
};

export default AddDesignSection;
