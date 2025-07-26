import React from "react";
import PigImage from "../pig.svg";
import { createAccountStore } from "../store/store";
import Top from "../Top/Top";
import "./ErrorPage.css";
export default function ErrorPage() {
  const user = createAccountStore((state) => state.user);

  const accessToken = createAccountStore((state) => state.accessToken);
  return (
    <>
      {accessToken ? (
        <>
          <Top userLetter={user?.username ? user?.username[0] : ""} />
          <div className="errorPage">
            coś poszło nie tak
            <img className="errorPage__pig" src={PigImage} alt="" />
          </div>
        </>
      ) : (
        <div className="errorPage without">
          coś poszło nie tak
          <img className="errorPage__pig" src={PigImage} alt="" />
        </div>
      )}
    </>
  );
}
