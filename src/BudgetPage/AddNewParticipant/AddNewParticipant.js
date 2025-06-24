import React from "react";
import "./AddNewParticipant.css";
import { useFormik } from "formik";
import ModalComponent from "../../ModalComponent/ModalComponent";

export default function AddNewParticipant({
  setOpenPopupToAdd,
  onSubmitBehavior,
}) {
  const formik = useFormik({
    initialValues: {
      userEmail: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.userEmail) {
        errors.userEmail = "Pole wymagane";
      }

      return errors;
    },
    onSubmit: (values) => {
      onSubmitBehavior(values.userEmail);
      setOpenPopupToAdd(false);
    },
  });
  return (
    <ModalComponent
      setOpenPopup={setOpenPopupToAdd}
      title={"Dodaj nowego uczestnika"}
      content={
        <form
          className="addNewParticipant__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="customFormElement">
            <label htmlFor="userEmail">
              Adres e-mail<sup>*</sup>
            </label>
            <input
              type="email"
              name="userEmail"
              className={`customInput ${
                formik.errors?.userEmail && formik.touched?.userEmail
                  ? "error"
                  : ""
              } `}
              value={formik.values?.userEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.userEmail && formik.touched?.userEmail ? (
              <div className="customError">{formik.errors?.userEmail}</div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="customButton">
            Zatwierdź
          </button>
        </form>
      }
    />
  );
}
