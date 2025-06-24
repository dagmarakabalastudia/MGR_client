import React, { useState } from "react";
import "./Participants.css";
import { BsPlus, BsXCircleFill, BsPeopleFill, BsX } from "react-icons/bs";

import AddNewParticipant from "../AddNewParticipant/AddNewParticipant";
import DeleteParticipant from "../DeleteParticipant/DeleteParticipant";

export default function Participants({
  participants,
  addNew,
  onRemoveParticipant,
  isOwner,
}) {
  const [openPopupToAdd, setOpenPopupToAdd] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [addClassToOpen, setAddClassToOpen] = useState(false);
  return (
    <>
      <div
        className={`participants__icon ${addClassToOpen ? "closed" : ""}`}
        onClick={() => setAddClassToOpen(true)}
      >
        <BsPeopleFill />
      </div>
      <div className={`participants ${addClassToOpen ? "showed" : ""}`}>
        <div className="participants__title">
          Uczestnicy
          <div
            className="participants__close"
            onClick={() => setAddClassToOpen(false)}
          >
            <BsX />
          </div>
        </div>

        <div className="participants__list">
          {participants && participants.length > 0 ? (
            participants.map((participant) => (
              <div
                key={`participant-${participant.name}`}
                className="participants__item"
              >
                <div className="participants__circle">
                  {participant?.username[0]}
                </div>
                {participant.username}
                {isOwner ? (
                  <div
                    className="participants__remove"
                    onClick={() => setDeletedId(participant._id)}
                  >
                    <BsXCircleFill />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <div className="participants__noParticipants">
              Nie współdzielisz z nikim tego budżetu
            </div>
          )}
        </div>
        <button
          className="customButton"
          onClick={() => setOpenPopupToAdd(true)}
        >
          <BsPlus />
          Dodaj
        </button>
        {openPopupToAdd ? (
          <AddNewParticipant
            setOpenPopupToAdd={setOpenPopupToAdd}
            onSubmitBehavior={addNew}
          />
        ) : (
          ""
        )}
        {deletedId ? (
          <DeleteParticipant
            setDeletedId={setDeletedId}
            deletedId={deletedId}
            onRemoveParticipant={onRemoveParticipant}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
