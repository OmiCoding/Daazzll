import React, { ChangeEvent, useState } from "react";

const MediaLinks = function () {
  const [state, setState] = useState({
    link: "",
  });

  const { link } = state;

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setState({
      ...state,
      link: value,
    });
  };

  return (
    <div className="medialinks-wrapper">
      <h2 className="links__title">Set your media links</h2>
      <form className="">
        <input type="text" value={link} onChange={(e) => handleChange(e)} />
      </form>
    </div>
  );
};

export default MediaLinks;
