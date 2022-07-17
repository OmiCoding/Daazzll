import React, { MouseEvent } from "react";

interface SelectProps {
  active: boolean;
  handleSelect: (e: MouseEvent<HTMLDivElement>) => void;
  // Needs proper typing
  handleOption: (e: any) => void;
}

const MLSelectSection: React.FC<SelectProps> = function ({
  active,
  handleSelect,
  handleOption,
}) {
  return (
    <div className="select-wrapper">
      <div
        className={`select__input ${active ? "select__input--active" : ""}`}
        onClick={handleSelect}
      >
        Select your social media
        <span className="select__arrow">
          <i
            className={`fa-solid fa-angle-down ${
              active ? "arrow--down" : "arrow--up"
            }`}
          />
        </span>
      </div>
      <div
        className="select__menu"
        style={{
          opacity: active ? "1" : "0",
          transform: active ? "scaleY(1)" : "scaleY(0)",
        }}
      >
        <div className="select__option">
          <input
            value="Twitter"
            type="button"
            className="option__btn"
            onClick={handleOption}
          />
          <span className="select__icon">
            <i className="fa-brands fa-twitter" />
          </span>
          Twitter
        </div>
        <div className="select__option">
          <input
            value="Discord"
            type="button"
            className="option__btn"
            onClick={handleOption}
          />
          <span className="select__icon">
            <i className="fa-brands fa-discord" />
          </span>
          Discord
        </div>
        <div className="select__option">
          <input
            value="Instagram"
            type="button"
            className="option__btn"
            onClick={handleOption}
          />
          <span className="select__icon">
            <i className="fa-brands fa-instagram" />
          </span>
          Instagram
        </div>
        <div className="select__option">
          <input
            value="Globe"
            type="button"
            className="option__btn"
            onClick={handleOption}
          />
          <span className="select__icon">
            <i className="fa-solid fa-globe" />
          </span>
          Website
        </div>
        <div className="select__option">
          <input
            value="Tiktok"
            type="button"
            className="option__btn"
            onClick={handleOption}
          />
          <span className="select__icon">
            <i className="fa-brands fa-tiktok" />
          </span>
          Tiktok
        </div>
      </div>
    </div>
  );
};

export default MLSelectSection;
