import React, { ChangeEvent, MouseEvent } from "react";
import useProfile from "../../../hooks/profile/useProfile";
import "../../../styles/profile/design-btn.css";

const AddDesignBtn: React.FC<{
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}> = function ({ handleChange, handleSubmit }) {
  const { design, submit } = useProfile();
  return (
    <div className="design-btn-wrapper">
      <p className="design-btn__title">Add a design ✨, show off your work!</p>
      <div className={`design-btn-input-wrapper ${submit ? "design-btn-input-wrapper--submit" : ""}`}>
        {submit ? (<button className="design-btn__input" onClick={handleSubmit}>
          Submit  
        </button>) : (<input
          name="design"
          type="file"
          className="design-btn__input"
          accept="image/gif"
          onChange={handleChange}
          disabled={design ? true : false}
        />)}
        {submit ? (<p className="design-btn__text design-btn__text--submit">
          Submit
        </p>) : (<p className="design-btn__text">
          Add Design
        </p>)}
      </div>
    </div>
  );
};

export default AddDesignBtn;
