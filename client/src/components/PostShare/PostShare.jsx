import React, { useState, useRef, useEffect } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const Navigate = useNavigate();

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleStatus = (event) => {
    setStatus(event.target.value)
  }

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!(image || status)) {
      console.log("Please add content")
      return;
    }

    //post data
    const newPost = {
      userId: user._id,
      desc: status
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      try {
        const imgUrl = await dispatch(uploadImage(data));
        newPost.image = imgUrl;
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    setStatus("")
    Navigate('/')
  };

  return (
    <div className="postShare-div">

    <div className="PostShare">
      <img
        src={
          user?.profilePicture
        }
        alt="Profile"
      />


      <div>
        <div className="postOptions">
          <input
            type="text"
            placeholder="What's happening?"
            value={status}
            onChange={handleStatus}
          />
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery size="30" />
          </div>

          <button
            className="button ps-button"
            style={!(image || status) ? { pointerEvents: "none", opacity: "0.8" } : { display: "block" }}
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default PostShare;
