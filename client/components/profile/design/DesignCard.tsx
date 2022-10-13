import React, { MouseEvent } from "react";

const DesignCard: React.FC<{
  elem: any;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}> = function ({ elem, handleClick }) {
  return (
    <li className="designs__card">
      <button className="designs__card-btn" onClick={(e) => handleClick(e)} />
    </li>
  );
};

export default DesignCard;
