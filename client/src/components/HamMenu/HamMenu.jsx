import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import New from '../../img/new.png'
import './HamMenu.css'

export default function HamMenu({open}) {
    const { user } = useSelector((state) => state.authReducer.authData);

    return (
        <div className={open ? "menu-div menu-div-open" : "menu-div menu-div-close"}>
            <img className='profileImage'
                src={
                    user?.profilePicture
                }
                alt="ProfileImage"
            />
            <span className='Username'>
                {user.firstname} {user.lastname}
            </span>

            <Link to={`/profile/${user._id}`}>
                Profile
            </Link>

            <Link to="/">
                Feed
            </Link>

            <Link to="/friends">
                Find friends
            </Link>

            <Link to="/ImageGen">
                <div className='Ai-div'>AI ImageGen
                <img src={New} alt="new"/>
                </div>
                
            </Link>
            
            <Link to="/trending">
                Trending
            </Link>

        </div>
    )
}
