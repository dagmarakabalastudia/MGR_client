import React from "react";
import { createAccountStore } from "./store/store";
import { Navigate } from "react-router-dom";
import Top from "./Top/Top";
import { ToastProvider } from "./ToastComponent/ToastComponent";

export default function ProtectRoute({ children }) {
  const user = createAccountStore((state) => state.user);
  const accessToken = createAccountStore((state) => state.accessToken);
  if (!accessToken) {
    return <Navigate replace to="/login"></Navigate>;
  }
  if (user) {
    return (
      <>
        <ToastProvider>
          <Top userLetter={user?.username ? user?.username[0] : ""} />
          {children}
        </ToastProvider>
      </>
    );
  }
  return <></>;
}
