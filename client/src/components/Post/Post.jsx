import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Delete from "../../img/delete.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import * as UserApi from "../../api/UserRequests.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading"

const Post = ({ data, onDelete }) => {
  const imageUrl = data?.image
  const createdAt = new Date(data.createdAt);

  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false)
  const [formattedTime, setFormattedTime] = useState("");

  const calculateTimeDifference = () => {
    const now = new Date();
    const diffInMilliseconds = now - createdAt - 20*60*1000;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    if (diffInMinutes < 1) {
      return `just now`;
    }else if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} days ago`;
    }
  };

  useEffect(() => {
    setLoading(true);
    setFormattedTime(calculateTimeDifference());
    let isMounted = true;
    const fetchData = async () => {
      if (data.userId !== user._id) {
        const user = await UserApi.getUser(data.userId);
        if (isMounted) {
          setUserData(user.data);
          setLoading(false);
        }
      } else {
        setUserData(user);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };

  return (
    <div>
      {
        loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ReactLoading type={"bars"} color="#fff" />
        </div> :
          <div className="Post">

            <div className="detail">
              <img src={
                userData?.profilePicture
              }
                alt="profile"
                className="userImage"
              />
              <div className="credentials">
                <span className="name">
                  <Link to={`/profile/${userData?._id}`}>
                    @{userData?.firstname}</Link>
                </span>
                <span className="username">{userData?.username}</span>
              </div>
              <div>
                {data.userId === user._id ?
                  <button className="deleteButton" onClick={() => onDelete(data._id)}><img style={{ width: "30px" }} src={Delete} ></img></button>
                  : <></>
                }
              </div>
            </div>
            <span className="desc"> {data.desc}</span>

            <img
              src={imageUrl ? imageUrl : ""}
              alt=""
            />


            <div className="postReact">
              <img
                src={liked ? Heart : NotLike}
                alt=""
                style={{ cursor: "pointer", width: "30px" }}
                onClick={handleLike}
              />
            </div>

            <div className="metaData">
              <span style={{ color: "rgba(232, 232, 233, 0.858)", fontSize: "12px" }}>
                {likes} likes
              </span>

              <span style={{ color: "rgba(232, 232, 233, 0.858)", fontSize: "12px" }}>
                {formattedTime} {/* Display the formatted time */}
              </span>
            </div>
          </div>
      }
    </div>
  );
};

export default Post;





