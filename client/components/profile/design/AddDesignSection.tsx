import React, { useState, MouseEvent } from "react";

import "../../../styles/profile/design.css";
import NavList from "./NavList";

const AddDesignSection = function () {
  const [list, setList] = useState("Gifs");

  const handleList = function (e: MouseEvent<HTMLAnchorElement>, str: string) {
    if (str) setList(str);
  };

  return (
    <section className="design-section">
      <div className="max-wrapper">
        <nav className="design-nav">
          <NavList list={list} setList={setList} handleList={handleList} />
        </nav>
      </div>
    </section>
  );
};

export default AddDesignSection;
