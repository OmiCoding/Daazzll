import React, { useRef, MouseEvent } from "react";
import useApp from "../../../../hooks/general/useApp";

interface SwitchProps {
  handleSwitch: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SwitchWrapper: React.FC<SwitchProps> = function ({ handleSwitch }) {
  const { modal } = useApp();
  const line = useRef<HTMLDivElement>(null);
  
  return (
    <div className="mdl-switch-wrapper">
      <div className="switch-wrapper">
        <ul className="switch__list">
          <li className="switch__li">
            <button
              className="switch__btn"
              onClick={handleSwitch}
              style={{
                color: modal === "avatar" ? "#000000" : "#707a83",
              }}
            >
              Profile
            </button>
          </li>
          <li className="switch__li">
            <button
              className="switch__btn"
              onClick={handleSwitch}
              style={{
                color: modal === "banner" ? "#000000" : "#707a83",
              }}
            >
              Banner
            </button>
          </li>
          <div
            ref={line}
            className="switch-bar"
            style={{
              transform:
                modal === "avatar" ? "translateX(0)" : "translateX(103px)",
            }}
          />
        </ul>
      </div>
    </div>
  );
};

export default SwitchWrapper;
