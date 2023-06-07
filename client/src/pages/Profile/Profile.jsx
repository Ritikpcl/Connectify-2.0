import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import InfoCard from "../../components/InfoCard/InfoCard";
import RightSide from "../../components/RightSide/RightSide";
import useWindowWidth from "../../useWindowWidth";

import "./Profile.css";
const Profile = () => {
  const windowWidth = useWindowWidth();
  return (
    <div className="Profile">
      {windowWidth > 1130 && <ProfileLeft/>}
      <div className="Profile-center">
        <ProfileCard location = 'profilePage'/>
        {windowWidth <= 1130 && <InfoCard/>}
        <div className="postSide"><PostSide/></div>
      </div>
      {windowWidth>1130 && <RightSide/>}
    </div>
  );
};

export default Profile;
