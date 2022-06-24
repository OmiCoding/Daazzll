import React, { useState, SyntheticEvent } from "react";
import { HeaderState } from "../../custom-types";
import useResizeHeader from "../../hooks/general/useResizeHeader";
import HamburgerIcon from "./HamburgerIcon";

type Props = {
  id: string;
};

const HamburgerHeader: React.FC<Props> = ({ id }) => {
  const [state, setState] = useState<HeaderState>({
    active: false,
  });

  const { active } = state;

  const handleClick = function (e: SyntheticEvent) {
    setState({
      ...state,
      active: !active,
    });
  };

  useResizeHeader(active, setState);

  return (
    <div className="hamburger-wrapper">
      <button id={id} onClick={handleClick} className="hamburger-button" />
      <HamburgerIcon active={active} />
    </div>
  );
};

export default HamburgerHeader;
