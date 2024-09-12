import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          Dashboard
        </div>

        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/user">
            <BsGrid1X2Fill className="icon" /> Profile
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/user/cart">
            <BsFillArchiveFill className="icon" /> My Cart
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/user/wishlist">
            <BsFillArchiveFill className="icon" /> Wish List
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/user/order">
            <BsFillGrid3X3GapFill className="icon" /> My Orders
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link>
            <BsFillGearFill className="icon" /> Log out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
