import React, { useLayoutEffect } from "react";

interface MediaProps {
  auth: boolean;
}

const ProfileMediaList: React.FC<MediaProps> = function ({ auth }) {
  return <ul className="profile-media__list"></ul>;
};

export default ProfileMediaList;
