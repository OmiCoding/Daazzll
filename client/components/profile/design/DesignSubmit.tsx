import React from "react";
import useProfile from "../../../hooks/profile/useProfile";

const DesignSubmit: React.FC<{ postDesign: () => void }> = function ({
  postDesign,
}) {
  const { design } = useProfile();

  return (
    <div
      className={`designs-submit-btn-wrapper ${
        design ? "designs-submit-btn-wrapper--appear" : ""
      }`}
    >
      <div className="designs-submit-btn-flx-wrapper">
        <button className="designs__submit-btn" onClick={postDesign} />
        <p className="designs__submit-text">Submit</p>
        <div className="designs-submit-icon-wrapper">
          <i className="fa-solid fa-folder-plus designs__submit-icon" />
        </div>
      </div>
    </div>
  );
};

export default DesignSubmit;
