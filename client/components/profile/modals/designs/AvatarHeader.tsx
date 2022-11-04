import React from "react";
import { Link } from "react-router-dom"; 
import HeaderInteract from "./HeaderInteract";

interface AvatarProps {
  username: string;
  avatar: string;
  device: boolean;
}

const AvatarHeader: React.FC<AvatarProps> = function({ username, avatar, device }) {
  return (
    <header className={`avatar-header ${device ? "" : "avatar-header--none"}`} >
      <div className="avatar-flx-wrapper">
        <div className="avatar-wrapper">
          <img className="avatar__image" src={avatar} />
          <Link className="avatar__img-link" to={`/${username}`} />
        </div>
        <div className="avatar-info-wrapper">
          <Link className="avatar__link" to={`/${username}`}>{username}</Link>
          <button className="avatar__follow-btn">Follow</button>
        </div>
      </div>
      <HeaderInteract />
    </header>  
  );
} 


export default AvatarHeader;