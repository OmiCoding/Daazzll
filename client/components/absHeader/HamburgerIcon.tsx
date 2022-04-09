import React from "react";

const HamburgerIcon: React.FC<{ active: boolean }> = function ({ active }) {
  return (
    <svg
      className="hamburger-menu"
      width="36"
      height="36"
      viewBox="0 0 9.5249999 9.5249999"
      version="1.1"
      id="svg5"
    >
      <path
        className={active ? "hm__path-1 hm__path-1--animate" : "hm__path-1"}
        d="m 1.025261,2.9104192 h 6.8791665 c 0.79375,0 0.79375,-1.5875 0,-1.5875 H 1.5544276 l 6.3499999,6.6145832"
        id="path991"
      />
      <path
        className={active ? "hm__path-2 hm__path-2--animate" : "hm__path-2"}
        d="m 2.8773443,5.0270857 5.0270833,5.3e-6"
        id="path1740"
      />
      <path
        className={active ? "hm__path-3 hm__path-3--animate" : "hm__path-3"}
        d="m 1.025261,6.8791691 h 6.8791667 c 0.7937498,0 0.7937498,1.3229167 -2e-7,1.3229167 H 1.5544276 L 8.1690109,1.5875025"
        id="path1742"
      />
    </svg>
  );
};

export default HamburgerIcon;
