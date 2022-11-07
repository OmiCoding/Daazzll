import React from "react";
import { Link } from "react-router-dom";
import useProfile from "../../../hooks/profile/useProfile";


const SocialMedia = function() {
  const { website, facebook, instagram, discord, twitter } = useProfile();

  return (
    <div className="social-media-wrapper">
      {website && <Link to={website} className="social-media__link">
        <i className="fa-solid fa-globe" />
      </Link>}
      {facebook && <Link to={facebook} className="social-media__link">
        <i className="fa-brands fa-facebook" />
      </Link>}
      {instagram && <Link to={instagram} className="social-media__link">
        <i className="fa-brands fa-instagram" />
      </Link>}
      {discord && <Link to={discord} className="social-media__link">
        <i className="fa-brands fa-discord" />
      </Link>}
      {twitter && <Link to={twitter} className="social-media__link">
        <i className="fa-brands fa-twitter" />  
      </Link>}
    </div>
  );
}


export default SocialMedia;