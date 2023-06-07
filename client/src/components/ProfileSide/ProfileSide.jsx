import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSide.css'
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <FollowersCard/>
        <ProfileCard location = 'homepage'/>
    </div>
    )
}

export default ProfileSide