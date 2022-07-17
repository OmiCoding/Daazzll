import React from "react";

interface HeaderProps {
  headerTxt: string;
  descTxt: string;
}

const HeaderSection: React.FC<HeaderProps> = function ({ headerTxt, descTxt }) {
  return (
    <>
      <h2 className="api__header">{headerTxt}</h2>
      <p className="api__desc">{descTxt}</p>
    </>
  );
};

export default HeaderSection;
