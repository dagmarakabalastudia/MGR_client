import React from "react";
import "./DeleteParticipant.css";
import ModalComponent from "../../ModalComponent/ModalComponent";

export default function DeleteBudget({
  setDeletedId,
  deletedId,
  onRemoveBudget,
}) {
  return (
    <ModalComponent
      setOpenPopup={setDeletedId}
      title={"Czy na pewno usunąć budżet?"}
      content={
        <div className="deleteParticipant__buttons">
          <button
            className="customButton"
            onClick={() => {
              onRemoveBudget(deletedId);
              setDeletedId(false);
            }}
          >
            Usuń
          </button>
          <button className="customButton" onClick={() => setDeletedId(false)}>
            Anuluj
          </button>
        </div>
      }
    />
  );
}
