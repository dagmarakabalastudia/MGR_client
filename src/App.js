import React from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import BudgetPage from "./BudgetPage/BudgetPage";
import ProtectRoute from "./ProtectRoute";
import { Routes, Route } from "react-router-dom";
import { createAccountStore } from "./store/store";
import moment from "moment";
import Register from "./Login/Register";
import EditProfile from "./EditProfile/EditProfile";
import ErrorPage from "./ErrorPage/ErrorPage";

export default function App() {
  moment.updateLocale("pl", {
    months: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Pażdziernik",
      "Listopad",
      "Grudzień",
    ],
  });
  const accessToken = createAccountStore((state) => state.accessToken);
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
  return (
    <>
      <Routes>
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectRoute children={<Profile />} />} />
        <Route
          path="/budget/:id"
          element={<ProtectRoute children={<BudgetPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectRoute children={<EditProfile />} />}
        />
      </Routes>
    </>
  );
}
