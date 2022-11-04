import React, { MouseEvent } from "react";

const DesignCard: React.FC<{
  elem: string | number;
  handleClick: (e: MouseEvent<HTMLButtonElement>, url: string) => void;
}> = function ({ elem, handleClick }) {
  if(typeof elem === "string") {
    return (
      <li className="designs__card">
        <img style={{
          width: "100%",
          height: "100%",
        }} src={elem} />
        <button className="designs__card-btn" onClick={(e) => handleClick(e, elem)} />
      </li> 
    );
  } else {
    return (
      <li className="designs__card" /> 
    );
  }
  
};

export default DesignCard;
