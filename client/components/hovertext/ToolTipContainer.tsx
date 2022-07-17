import React from "react";

import "../../styles/general.css";

interface TTProps {
  content: string;
  ttClass: string;
}

const ToolTipContainer: React.FC<TTProps> = function ({ content, ttClass }) {
  return (
    <div className={`tt-abs-wrapper ${ttClass}`}>
      <div className="tt-rel-wrapper">
        <span className="tt__content">{content}</span>
        <div className="triangle triangle--down triangle--center-lr" />
      </div>
    </div>
  );
};

export default ToolTipContainer;
