import React, { useState } from "react";
import "./Top.css";
import { BsGear, BsPower } from "react-icons/bs";
import { Link } from "react-router-dom";
import { createAccountStore } from "../store/store";
import Logo from "../logo.svg";
export default function Top({ userLetter }) {
  const [openMenu, setOpenMenu] = useState(false);
  const setAccessToken = createAccountStore((state) => state.setAccessToken);

  return (
    <div className={"top"}>
      <Link to={"/"} className="top__left">
        <img src={Logo} alt="" />
      </Link>
      {userLetter ? (
        <div className="top__right">
          <div className="top__profile" onClick={() => setOpenMenu(!openMenu)}>
            {userLetter}
          </div>
          {openMenu ? (
            <div className="top__menu">
              <Link to="/profile" className="top__element">
                <BsGear /> Profil
              </Link>
              <button
                className="top__element"
                onClick={() => setAccessToken(undefined)}
              >
                <BsPower /> Wyloguj
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
