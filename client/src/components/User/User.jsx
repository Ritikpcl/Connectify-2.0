import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { Link } from "react-router-dom";
import Add from '../../img/add.png';
import Remove from '../../img/remove.png';
import './User.css';

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(user.following.includes(person._id));

  useEffect(()=>{
    setFollowing(user.following.includes(person._id))
  },)

  const handleFollow = async () => {
    await following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img
          src={person?.profilePicture}
          alt="profile"
          className="followerImage"
          style={{ marginLeft: "1rem" }}
        />
        <div className="name">
          <span>
            <Link
              to={`/profile/${person._id}`}
              style={{
                color: "rgba(255, 255, 255, 1)",
                textDecoration: "none",
                fontWeight: "normal"
              }}
            >
              {person.firstname}
            </Link>
          </span>
          <span
            style={{
              color: "rgba(232, 232, 233, 0.7)",
              textDecoration: "none",
              fontWeight: "normal"
            }}
          >
            {person.username}
          </span>
        </div>
      </div>
      <button
        style={{ border: "none", marginLeft: "1rem", marginRight: "1rem", background: "transparent" }}
        onClick={handleFollow}
      >
        {user.following.includes(person._id) ? (
          <img src={Remove} alt="-" style={{ width: "28px" }} />
        ) : (
          <img src={Add} alt="+" style={{ width: "28px" }} />
        )}
      </button>
    </div>
  );
};

export default User;
