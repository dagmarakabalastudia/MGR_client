import React from "react";
import "./DeleteParticipant.css";
import ModalComponent from "../../ModalComponent/ModalComponent";

export default function DeleteTransaction({
  setDeletedId,
  deletedId,
  onRemoveTransaction,
}) {
  return (
    <ModalComponent
      setOpenPopup={setDeletedId}
      title={"Czy na pewno usunąć transakcję?"}
      content={
        <div className="deleteParticipant__buttons">
          <button
            className="customButton"
            onClick={() => {
              onRemoveTransaction(deletedId);
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
