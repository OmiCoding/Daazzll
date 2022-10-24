import React, { MouseEvent } from "react";
import DesignCard from "./DesignCard";

interface ListProps {
  designs: string[];
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const arr = [1, 2, 3];

const DesignsList: React.FC<ListProps> = function({ designs, handleClick }) {
  return (
    <>
      {designs.length === 0 ? (arr.map((elem, ind) => {
        return (
          <DesignCard key={ind} elem={elem} handleClick={handleClick} />
        );
      })) : (designs.map((elem, ind) => {
        return (
          <DesignCard key={ind} elem={elem} handleClick={handleClick} />
        );
      }))}
    </>
  );
}



export default DesignsList;