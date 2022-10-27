import React, { MouseEvent } from "react";

const DesignCard: React.FC<{
  elem: any;
  handleClick: (e: MouseEvent<HTMLButtonElement>, url: string) => void;
}> = function ({ elem, handleClick }) {
  return (
    <li className="designs__card">
      <button className="designs__card-btn" onClick={(e) => handleClick(e, elem)} />
      <img style={{
        width: "100%",
        height: "100%",
      }} src={elem} />
    </li> 
  );
};

export default DesignCard;
