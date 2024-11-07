import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function Topbar() {
  const admin = useSelector((state) => state.user.currentUser);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">PenguinTechadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Link to='/profile'>
          
          <img src={admin.img} alt="" className="topAvatar" />
          </Link>
        </div>
      </div>
    </div>
  );
}
