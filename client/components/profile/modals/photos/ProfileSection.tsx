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

const ProfileSection: React.FC<SectionProps> = function ({
  uploaded,
  handleSubmit,
  handleChange,
}) {
  const { modal } = useApp();

  return (
    <CSSTransition
      in={modal === "user-photo"}
      timeout={300}
      appear={true}
      classNames="slideleft"
      unmountOnExit
    >
      <div className="transition-wrapper-1">
        <HeaderSection
          headerTxt={"Add Your Profile Image"}
          descTxt={"A nice logo or self image to show off to the world!"}
        />

        <UserImagesForm
          name={"profile"}
          uploaded={uploaded}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </CSSTransition>
  );
};

export default ProfileSection;
