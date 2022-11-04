import Cookies from "js-cookie";
import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import useProfile from "../../../../hooks/profile/useProfile";
import MLSelectSection from "./MLSelectSection";

const MediaLinksForm: React.FC = function () {
  const { storeLink } = useProfile();

  const [state, setState] = useState({
    link: "",
    option: "Discord",
    active: false,
  });

  const { link, active, option } = state;

  let ph: string;

  if (option === "Discord") {
    ph = "https://discord.gg/";
  } else if (option === "Twitter") {
    ph = "https://twitter.com/[username]";
  } else if (option === "Instagram") {
    ph = "https://www.instagram.com/username";
  } else if (option === "Website") {
    ph = "https://domainname.ext";
  } else if (option === "Tiktok") {
    ph = "https://tiktok.com/username";
  } else {
    ph = "https://discord.gg/";
  }

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setState({
      ...state,
      link: value,
    });
  };

  const handleClick = function (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  };

  const handleSelect = function (e: MouseEvent<HTMLDivElement>) {
    setState({
      ...state,
      active: !active,
    });
  };

  // Find a proper type for this function
  const handleOption = function (e: any) {
    setState({
      ...state,
      active: false,
      option: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const accessToken = Cookies.get("access_token");

    e.preventDefault();

    // proper validation required in the future
    if (link.length === 0) return;

    if (storeLink) {
      storeLink(link, option);
    }
  };

  return (
    <div className="ml-form-wrapper">
      <h2 className="ml-form__title">Set up your network</h2>
      <p className="ml-form__desc">
        Add your social media links let&apos;s share your work with others, and
        grow your following!
      </p>
      <form onSubmit={handleSubmit} className="medialinks__form">
        <MLSelectSection
          active={active}
          handleSelect={handleSelect}
          handleOption={handleOption}
        />
        <div className="ml-link-input-wrapper">
          <div className="mdl-input-wrapper-1">
            <label className="ml-link__label">{option}</label>
            <input
              className="modal__input-1"
              type="text"
              value={link}
              onChange={(e) => handleChange(e)}
              placeholder={link.length !== 0 ? link : ph}
            />
          </div>
          <button
            type={"button"}
            className="ml-link__btn"
            onClick={handleClick}
          >
            <i className="fa solid fa-link" />
          </button>
        </div>
        <div className="btn-wrapper-1 ml-btn-xtra-styles">
          <button type="submit" className="btn-pad-2 btn-1">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediaLinksForm;
