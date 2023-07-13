import React, { useState } from "react";
import "./ImageGenerate.css";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import useWindowWidth from "../../useWindowWidth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const ImageGenerate = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const windowWidth = useWindowWidth();
  const Navigate = useNavigate();

  const handleStatus = (event) => {
    setStatus(event.target.value)
  }

  const handlePrompt = (event) => {
    setPrompt(event.target.value)
  }

  const showProgress=()=>{
    Swal.fire({
      title: 'Image generating...',
      html: 'AI creating captivating visual masterpieces',
      timer: 7000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  const generateImage = async () => {
    setLoading(true)
    showProgress()

      try {
            const response = await fetch(
              `${process.env.REACT_APP_IMAGE_GEN_URL}`,
                {
                    headers: { Authorization: `Bearer ${process.env.REACT_APP_IMAGE_GEN_API}` },
                    method: "POST",
                    body: JSON.stringify(prompt),
                }
            );
            const result = await response.blob();
            console.log(result)
            setImage(result)
            setLoading(false)
      } catch (error) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: `Something went wrong`,
          showConfirmButton: false,
          timer: 2000,
        })
        console.error(error);
        setLoading(false)
      }
  };

  // handle post upload
  const handleUpload = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (!(image || status)) {
      console.log("Please add content")
      return;
    }

    //post data
    const newPost = {
      userId: user._id,
      desc: status
      // desc : desc.current ? desc.current.value : ''
    };

    // if there is an image with post

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + `${prompt}.jpg`
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
    setPrompt("")
    setLoading(false)
    Navigate('/')
  };

  return (
    <>
    {
        windowWidth > 1130 &&
      <div className="tagLine">
        <hr></hr>
        Let the AI make your imagination into visualization
      </div>
    }
      <div className="PostShare ImageGenerator-div">
        <div>
          <input
            type="text"
            placeholder="Enter your prompt"
            onChange={handlePrompt}
            value={prompt}
          />

          <button
            className="button s-button"
            style={!(prompt) ? { pointerEvents: "none", opacity: "0.5" } : { display: "block" }}
            onClick={generateImage}
          >
            {
              loading ? "Getting..." : "Get Image"
            }
          </button>

          <input
            type="text"
            placeholder="What's happening?"
            value={status}
            onChange={handleStatus}
          />

          <div className="postOptions">

            <button
              className="button s-button"
              style={!(image || status) ? { pointerEvents: "none", opacity: "0.5" } : { display: "block" }}
              onClick={handleUpload}
            >
              {loading ? "Sharing..." : "Share" }
            </button>
          </div>

          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="Server Error" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageGenerate;
