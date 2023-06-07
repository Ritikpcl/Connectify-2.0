import React, { useState } from "react";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Logout from "../../img/logout.png"
import Menu from "../../img/menu.png"
import CloseMenu from "../../img/closeMenu.png";
import useWindowWidth from "../../useWindowWidth";
import HamMenu from "../HamMenu/HamMenu";
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import { useDispatch } from "react-redux";


const NavIcons = () => {
  
  const windowWidth = useWindowWidth();
  const [toggleMenu,setToggleMenu] = useState(false)
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(logout())
  }
  
  const handleMenu=()=>{
    setToggleMenu((prev) => !prev)
  }
  
  
  return (
    <div className="navIcons">
      {
        windowWidth < 1130 &&
        <>
        {
          toggleMenu ? <img src={CloseMenu} alt="closeMenu" onClick={handleMenu} /> : <img src={Menu} alt="menu" onClick={handleMenu} />
          
        }
          <HamMenu open={toggleMenu}/>
        </>
      }
      <Link to="../home">
        <img src={Home} alt="" style={{ width: "30px" }} />
      </Link>
      <button style={{ background: "transparent", border: "none", cursor: "pointer" }} onClick={handleLogOut}><img style={{ width: "25px" }} src={Logout} alt="" /></button>
      <img src={Noti} alt="" style={{ width: "30px" }}/>
    </div>
  );
};

export default NavIcons;
