import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserApi from "../../api/UserRequests.js";
import "./ProfileCard.css";
import ReactLoading from "react-loading"

const ProfileCard = ({ location }) => {
  const params = useParams();
  const posts = useSelector((state) => state.postReducer.posts);
  const mainUser = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   if (params.id && mainUser.user._id !== params.id) {
  //     getUser();
  //   } else {
  //     setUser(mainUser.user);
  //     setLoading(false)
  //   }
  //   console.log(user)
  // }, [params.id, mainUser]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (params.id && mainUser.user._id !== params.id) {
          const response = await UserApi.getUser(params.id);
          setUser(response.data);
      
        } else {
          setUser(mainUser.user);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id, mainUser]);

  if(loading){
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <ReactLoading type={"bars"} color="#fff" />
  </div>
  }

  return (
    <div className="profile-card-div">
    <div className= {location === "profilePage" ? "profilePageCard" : "ProfileCard"} >
      <div className="ProfileImages">
        <img className="coverImage"
          src={
            user?.coverPicture
          }
          alt="CoverImage"
        />
        <img className="profileImage"
          src={
            user?.profilePicture
          }
          alt="ProfileImage"
        />
      </div>

      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : ""}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following?.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
    </div>
  );
};

export default ProfileCard;
