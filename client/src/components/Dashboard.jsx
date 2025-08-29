import React from "react";
import Header from "./Header";
import { NavLink, Route, Routes } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardHome from "./DashboardHome";
import DashboardUsers from "./DashboardUsers";
import DashboardSongs from "./DashboardSongs";
import DashboardArtist from "./DashboardArtist";
import DashboardAlbum from "./DashboardAlbum";
import DashboardNewSongs from "./DashboardNewSongs";
import Alert from "./Alert";
import { useStateValue } from "../context/StateProvider";

const Dashboard = () => {

  const [{alertType}, dispatch] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly ">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashboard/user"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/songs"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Songs
        </NavLink>
        <NavLink
          to={"/dashboard/artists"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Artists
        </NavLink>
        <NavLink
          to={"/dashboard/albums"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Albums
        </NavLink>
      </div>

      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUsers />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artists" element={<DashboardArtist />} />
          <Route path="/albums" element={<DashboardAlbum />} />
          <Route path="/new-songs" element={<DashboardNewSongs />} />
        </Routes>
      </div>

      {alertType && (
              <Alert type={alertType}/>
      )}

    </div>
  );
};

export default Dashboard;
