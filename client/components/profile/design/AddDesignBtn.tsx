import React, { ChangeEvent } from "react";
import useProfile from "../../../hooks/profile/useProfile";
import "../../../styles/profile/design-btn.css";

const AddDesignBtn: React.FC<{
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = function ({ handleChange }) {
  const { design } = useProfile();
  return (
    <div className="design-btn-wrapper">
      <p className="design-btn__title">Add a design ✨, show off your work!</p>
      <div className="design-btn-input-wrapper">
        <input
          name="design"
          type="file"
          className="design-btn__input"
          accept="image/gif"
          onChange={handleChange}
          disabled={design ? true : false}
        />
        <p className="design-btn__text">Add Design</p>
      </div>
    </div>
  );
};

export default AddDesignBtn;
