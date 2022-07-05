import React, { ChangeEvent, MouseEvent, useState } from "react";

const MediaLinksForm: React.FC = function () {
  const [state, setState] = useState({
    links: "",
  });

  const { links } = state;

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setState({
      ...state,
      links: value,
    });
  };

  const handleClick = function (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  };

  return (
    <div className="ml-form-wrapper">
      <h2 className="ml-form__title">Set up your network</h2>
      <p className="ml-form__desc">
        Add your social media links let&apos;s share your work with others, and
        grow your following!
      </p>
      <form className="medialinks__form">
        <div className="ml-link-input-wrapper">
          <div className="mdl-input-wrapper-1">
            <label className="ml-link__label">Discord</label>
            <input
              className="modal__input-1"
              type="text"
              value={links}
              onChange={(e) => handleChange(e)}
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
        <div className="btn-wrapper-1">
          <button type="submit" className="btn-pad-2 btn-1">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediaLinksForm;
