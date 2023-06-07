import React, { useEffect, useState } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import useWindowWidth from "../../useWindowWidth";
import NavIcons from "../../components/NavIcons/NavIcons";

import "./Home.css";
const Home = () => {

  const windowWidth = useWindowWidth();
  return (
    <>
      {
        windowWidth > 1130 ? <>
          <div className="Home">
            <ProfileSide className="profile-side" />
            <PostSide />
            <RightSide className="right-side" />
          </div>
        </> : <>
          <div className="navbar-div"><NavIcons/></div>
          <PostSide />
        </>
      }
    </>
  );
};

export default Home;
