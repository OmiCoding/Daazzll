import React from "react";

interface ModalData {
  design: string;
}

const DesignsContent: React.FC<ModalData> = function ({ design }) {
  console.log(design);
  
  return (
    <section className="designs__mdl-content">
      <div className="designs-img-wrapper"></div>
    </section>
  );
}

export default DesignsContent;
