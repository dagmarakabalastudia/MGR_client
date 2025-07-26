import React, { useState } from "react";
import "./EditProfile.css";
import { createAccountStore } from "../store/store";
import ChangePassword from "./ChangePassword/ChangePassword";
import axios from "axios";
import { useToast } from "../ToastComponent/ToastComponent";

export default function EditProfile() {
  const user = createAccountStore((state) => state.user);
  const { addToast } = useToast();

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const changePasswordFunction = (values) => {
    axios
      .put(
        process.env.REACT_APP_SERVER_URL + `users/${user.id}/password`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        addToast("Hasło zmienione", "success");
      })
      .catch((error) => {
        addToast(
          error?.response?.data.error
            ? error?.response?.data.error
            : "Wystąpił błąd",
          "error"
        );
      });
  };
  if (user) {
    return (
      <div className="editProfile">
        <div className="container">
          <div className="editProfile__box">
            <div className="editProfile__title">Twoje informacje</div>
            <div className="customFormElement">
              <label htmlFor="mail">Nazwa użytkownika</label>
              <input
                type="text"
                name="username"
                className={`customInput`}
                value={user.username}
                disabled={true}
              />
            </div>
            <div className="customFormElement">
              <label htmlFor="mail">E-mail</label>
              <input
                type="text"
                name="mail"
                className={`customInput`}
                value={user.mail}
                disabled={true}
              />
            </div>

            <div className="customFormElement">
              <label htmlFor="name">Imię</label>
              <input
                type="text"
                name="name"
                className={`customInput`}
                value={user.name}
                disabled={true}
              />
            </div>
            <div className="customFormElement">
              <label htmlFor="name">Nazwisko</label>
              <input
                type="text"
                name="surname"
                className={`customInput`}
                value={user.surname}
                disabled={true}
              />
            </div>

            <button
              className="customButton"
              style={{ width: "50%" }}
              onClick={() => {
                setOpenChangePassword(true);
              }}
            >
              Zmień hasło
            </button>
          </div>
        </div>
        {openChangePassword ? (
          <ChangePassword
            changePassword={changePasswordFunction}
            setOpenPopup={setOpenChangePassword}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
