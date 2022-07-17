import React from "react";
import ToolTipContainer from "../hovertext/ToolTipContainer";

interface IconProps {
  iconClass: string;
  typeClass: string;
  ttClass: string;
  content: string;
}

const IconContainer: React.FC<IconProps> = function ({
  iconClass,
  typeClass,
  ttClass,
  content,
}) {
  return (
    <div className="card-wrapper">
      <div className={`card-shape card--shadow`}>
        <i className={`fa-${typeClass} fa-${iconClass}`} />
      </div>
      <button className="card__btn" />
      <ToolTipContainer content={content} ttClass={ttClass} />
    </div>
  );
};

export default IconContainer;
