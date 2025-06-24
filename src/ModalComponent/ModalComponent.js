import React from "react";
import "./ModalComponent.css";

export default function ModalComponent({ content, setOpenPopup, title }) {
  return (
    <div className={"modalComponent"}>
      <div
        className="modalComponent__popupBackground"
        onClick={(e) => {
          e.preventDefault();
          setOpenPopup(false);
        }}
      ></div>
      <div className="modalComponent__box">
        <div className="modalComponent__title">{title}</div>
        <div className="modalComponent__content">{content}</div>
      </div>
    </div>
  );
}
