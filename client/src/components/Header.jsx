import React, { useState } from "react";
import Logo from "../assets/img/logo.png"; // not through an index.js
import { NavLink, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { useStateValue } from "../context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const navigate = useNavigate();
  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={Logo} alt="logo" width={50} height={50} />
      </NavLink>

      <ul className="flex items-center justify-center ml-7 ">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Music
          </NavLink>
        </li>
        {/* <li className="mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Contact
          </NavLink>
        </li> */}
      </ul>

      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          src={user?.user?.imageUrl}
          alt="profile"
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-gray text-md">{user?.user?.name}</p>
          <p className="flex items-center gap-2 text-gray-400 text-xs">
            Premium {user?.user?.role}{" "}
            <FaCrown className="text-xs -ml-1 text-yellow-400 font-normal" />
          </p>
        </div>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col p-4 gap-4"
          >
            <NavLink to={"/user-profile"}>
              <p className="text-base text-lighttextGray hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            <p className="text-base text-lighttextGray hover:font-semibold duration-150 transition-all ease-in-out">
              Favorites
            </p>
            <hr />
            {user?.user?.role === 'admin' && (
              <NavLink to={"/dashboard/home"}>
                <p className="text-base text-lighttextGray hover:font-semibold duration-150 transition-all ease-in-out">
                  Dashboard
                </p>
              </NavLink>
            )}

            <p
              className="text-base text-lighttextGray hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logout}
            >
              Sign Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
