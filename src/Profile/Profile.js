import React from "react";
import "./Profile.css";
import { createAccountStore } from "../store/store";

import Budgets from "./Budgets/Budgets";
export default function Profile() {
  const user = createAccountStore((state) => state.user);
  if (user) {
    return (
      <div className="profile">
        <div className="container">
          <div className="profile__box">
            <div className="profile__name">
              Witaj {user.name} {user.surname}, co chcesz zrobić?
            </div>
            <Budgets />
          </div>
        </div>
      </div>
    );
  }
}
