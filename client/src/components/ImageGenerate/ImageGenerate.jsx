import React, { useState } from "react";
import "./ImageGenerate.css";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import useWindowWidth from "../../useWindowWidth";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
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

  const getImage = async (hash) => {
    console.log("getImage", hash)
    const options = {
      method: 'GET',
      url: 'https://arimagesynthesizer.p.rapidapi.com/get',
      params: { hash: hash, returnType: 'base64' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'arimagesynthesizer.p.rapidapi.com'
      }
    };

    try {
      
      await axios.request(options).then(response => {
        console.log(response)

        const base64String = response.data.image;

        // Decode the base64 string into a binary string
        const binaryString = atob(base64String);

        // Convert the binary string to a typed array
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a new Blob object with the typed array
        const blob = new Blob([bytes], { type: 'image/jpeg' }); // Replace 'image/jpeg' with the appropriate MIME type

        console.log(blob); // You can now use the blob object as needed
        setImage(blob)
        setLoading(false)
      })
    } catch (error) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: `Something went wrong`,
        showConfirmButton: false,
        timer: 2000,
      })
      console.log(error)
      setLoading(false)
    };
  }

  const myFunction = (hash) => {
    setTimeout(() => getImage(hash), 10000);
  }

  const showProgress=()=>{
    Swal.fire({
      title: 'Image generating...',
      html: 'AI creating captivating visual masterpieces',
      timer: 12000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  const generateImage = () => {
    setLoading(true)
    showProgress()
    const encodedParams = new URLSearchParams();
    encodedParams.append("prompt", `${prompt}`);
    encodedParams.append("id", `${Date.now()}${prompt}`);
    encodedParams.append("width", "768");
    encodedParams.append("height", "768");
    encodedParams.append("inferenceSteps", "50");
    encodedParams.append("guidanceScale", "20");
    encodedParams.append("img2img_strength", "0.5");

    const options = {
      method: 'POST',
      url: 'https://arimagesynthesizer.p.rapidapi.com/generate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'arimagesynthesizer.p.rapidapi.com'
      },
      data: encodedParams
    };

    try {
      axios.request(options)
        .then(response => {
          console.log("response", response.data.hash)
          // setHashCode(response.data.hash)
          // console.log("response", hashCode)
          myFunction(response.data.hash)
        })
    } catch (error) {
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
