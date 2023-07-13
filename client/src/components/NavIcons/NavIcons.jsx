import React, { useState } from "react";
import Home from "../../img/home.png";
import Chat from "../../img/chat.png";
import Logout from "../../img/logout.png"
import Menu from "../../img/menu.png"
import CloseMenu from "../../img/closeMenu.png";
import useWindowWidth from "../../useWindowWidth";
import HamMenu from "../HamMenu/HamMenu";
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'


const NavIcons = () => {
  
  const windowWidth = useWindowWidth();
  const [toggleMenu,setToggleMenu] = useState(false)
  const dispatch = useDispatch()


  const handleLogOut = () => {
    logoutAlert()
    return;
  }
  
  const handleMenu=()=>{
    setToggleMenu((prev) => !prev)
  }

  const logoutAlert = () =>{
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#121111',
      cancelButtonColor: '#4B4B4B',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if(result.isConfirmed){
        dispatch(logout())
      }else return
    })
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
      <a href="https://ritik-chatify.vercel.app" target="_blank" > <img src={Chat} alt="" style={{ width: "30px" }}/> </a>
      <button style={{ background: "transparent", border: "none", cursor: "pointer" }} onClick={handleLogOut}><img style={{ width: "27px" }} src={Logout} alt="" /></button>
    </div>
  );
};

export default NavIcons;
