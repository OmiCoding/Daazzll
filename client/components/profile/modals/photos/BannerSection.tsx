import React, { ChangeEvent, FormEvent } from "react";
import { CSSTransition } from "react-transition-group";
import useApp from "../../../../hooks/general/useApp";
import HeaderSection from "./HeaderSection";
import UserImagesForm from "./UserImagesForm";

interface SectionProps {
  uploaded: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const BannerSection: React.FC<SectionProps> = function ({
  uploaded,
  handleChange,
  handleSubmit,
}) {
  const { modal } = useApp();

  return (
    <CSSTransition
      in={modal === "banner"}
      timeout={300}
      classNames="slideleft"
      unmountOnExit
    >
      <div className="transition-wrapper-1">
        <HeaderSection
          headerTxt={"Add Your Banner Image"}
          descTxt={"Backgrounds are always a nice touch for aesthetics"}
        />

        <UserImagesForm
          name={"banner"}
          uploaded={uploaded}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </CSSTransition>
  );
};

export default BannerSection;
