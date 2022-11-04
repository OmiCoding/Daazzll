import React, { MouseEvent } from "react";
import AvatarHeader from "./AvatarHeader";
import useProfile from "../../../../hooks/profile/useProfile";
import useApp from "../../../../hooks/general/useApp";
import "../../../../styles/profile/social.css";
import CommentSection from "./CommentSection";

interface DesignProps {
  design: string;
}

const DesignsContent: React.FC<DesignProps> = function ({ design }) {
  const { resize, closeModal } = useApp();
  const { username, avatar } = useProfile();

  const isMobile = Boolean(resize === "mobile");
  const isDesktop = Boolean(resize === "desktop");

  const handleClick = function (e: MouseEvent<HTMLButtonElement>) {
    if(closeModal) {
      closeModal();
    }
  }

  return (
    <section className="designs-modal">
      <div className="avatar-close-wrapper">
        <button className="avatar__close-btn" onClick={handleClick}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <AvatarHeader username={username} avatar={avatar} device={isMobile} />
      <div className="designs-img-wrapper">
        <img className="designs-modal-img" src={design} />
      </div>
      <div className="designs-text-wrapper">
        <AvatarHeader username={username} avatar={avatar} device={isDesktop} />
        <div className="content-wrapper">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <CommentSection />
      </div>
    </section>
  );
}

export default DesignsContent;
