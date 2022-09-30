import React from "react";
import DesignCard from "./DesignCard";

const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

const DesignContainer = function () {
  return (
    <section className="designs">
      <div className="max-wrapper">
        <ol className="designs__list">
          {arr.map((elem) => {
            return <DesignCard key={elem} />;
          })}
        </ol>
      </div>
    </section>
  );
};

export default DesignContainer;
