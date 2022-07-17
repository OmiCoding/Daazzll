import React, { FormEvent, ChangeEvent } from "react";

import SvgContainer from "./SvgContainer";

import useApp from "../../../../hooks/general/useApp";

interface UImagesProps {
  name: string;
  uploaded: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const UserImagesForm: React.FC<UImagesProps> = function ({
  name,
  uploaded,
  handleChange,
  handleSubmit,
}) {
  const { modal } = useApp();

  return (
    <form onSubmit={handleSubmit} className="api__form">
      <div className="file-input-wrapper">
        <input
          name={name}
          type="file"
          className="input__file"
          accept="image/*"
          onChange={handleChange}
        />
        <div className="upload-btn">Upload file</div>
        <SvgContainer modal={modal} />
        <label className="file__label">
          {modal === "banner"
            ? "Upload your banner image"
            : "Upload your profile image"}
          <span>Allowed files:PNG JPEG</span>
        </label>
      </div>
      <div className="btn-wrapper-1 api-btn-custom">
        <button
          type="submit"
          className={`btn-pad-2 btn-1 ${uploaded ? "" : "btn--disabled-2"}`}
          disabled={!uploaded}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserImagesForm;
