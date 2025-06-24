import React from "react";
import "./DeleteParticipant.css";
import ModalComponent from "../../ModalComponent/ModalComponent";

export default function DeleteParticipant({
  setDeletedId,
  deletedId,
  onRemoveParticipant,
}) {
  return (
    <ModalComponent
      setOpenPopup={setDeletedId}
      title={"  Czy na pewno usunąć uczestnika budżetu?"}
      content={
        <div className="deleteParticipant__buttons">
          <button
            className="customButton"
            onClick={() => {
              onRemoveParticipant(deletedId);
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
