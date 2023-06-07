import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      setProfileUser({});

      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        try {
          const profileUser = await UserApi.getUser(profileUserId);
          setProfileUser(profileUser.data);
          setFollowing(profileUser.data.followers.includes(user._id));
        } catch (error) {
          console.error("Failed to get user:", error.message);
        }
      }
    };
    fetchProfileUser();
  }, [params.id, user]);


  const handleFollow = async () => {
    following
      ? dispatch(unfollowUser(profileUser._id, user))
      : dispatch(followUser(profileUser._id, user));
    setFollowing((prev) => !prev);
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        {/* */}
        <span>
          <b>Status </b>
        </span>
        <span> {profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span> {profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      <div className="button-div">
        <div>
          {user._id === profileUserId ? (
            <button className="button logout-button" onClick={handleLogOut}>
              Log Out
            </button>
          ) : (
            <button className="button logout-button" onClick={handleFollow}>
              {following ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard
