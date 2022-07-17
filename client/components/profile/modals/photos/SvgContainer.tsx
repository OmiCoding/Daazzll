import React from "react";

interface SvgProps {
  modal: string;
}

const SvgContainer: React.FC<SvgProps> = function ({ modal }) {
  return (
    <div className="file-box">
      <div className="dashed-box" />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        rx={12}
        ry={12}
        className="dashed-box-wrapper"
      >
        <rect
          width="95"
          height="95"
          rx={12}
          ry={12}
          x={2}
          y={2}
          className="dashed__box"
        />
      </svg>
      <div className="file-profile-wrapper">
        <div
          className="file-icon"
          style={{
            width: modal === "banner" ? "150px" : "80px",
          }}
        />
      </div>
    </div>
  );
};

export default SvgContainer;
