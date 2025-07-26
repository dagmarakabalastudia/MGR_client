import React from "react";
import "./ChangePassword.css";
import { useFormik } from "formik";
import ModalComponent from "../../ModalComponent/ModalComponent";

export default function ChangePassword({ changePassword, setOpenPopup }) {
  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validate: (values) => {
      const errors = {};
      if (!values.oldPassword) {
        errors.oldPassword = "Pole wymagane";
      }
      if (!values.newPassword) {
        errors.newPassword = "Pole wymagane";
      }
      if (
        values.confirmPassword &&
        values.confirmPassword !== values.newPassword
      ) {
        errors.confirmPassword = "Hasła muszą być identyczne";
      }
      return errors;
    },
    onSubmit: (values) => {
      changePassword(values);
    },
  });

  return (
    <ModalComponent
      setOpenPopup={setOpenPopup}
      title={"Zmień hasło"}
      content={
        <form
          className="addNewParticipant__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="customFormElement">
            <label htmlFor="mail">
              Stare hasło<sup>*</sup>
            </label>
            <input
              type="password"
              name="oldPassword"
              className={`customInput ${
                formik.errors?.oldPassword && formik.touched?.oldPassword
                  ? "error"
                  : ""
              } `}
              value={formik.values?.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.oldPassword && formik.touched?.oldPassword && (
              <div className="customError">{formik.errors?.oldPassword}</div>
            )}
          </div>
          <div className="customFormElement">
            <label htmlFor="mail">
              Nowe hasło<sup>*</sup>
            </label>
            <input
              type="password"
              name="newPassword"
              className={`customInput ${
                formik.errors?.newPassword && formik.touched?.newPassword
                  ? "error"
                  : ""
              } `}
              value={formik.values?.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.newPassword && formik.touched?.newPassword && (
              <div className="customError">{formik.errors?.newPassword}</div>
            )}
          </div>
          <div className="customFormElement">
            <label htmlFor="mail">
              Powtórz nowe hsło<sup>*</sup>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`customInput ${
                formik.errors?.confirmPassword &&
                formik.touched?.confirmPassword
                  ? "error"
                  : ""
              } `}
              value={formik.values?.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.confirmPassword &&
              formik.touched?.confirmPassword && (
                <div className="customError">
                  {formik.errors?.confirmPassword}
                </div>
              )}
          </div>

          <button type="submit" className="customButton">
            Potwierdź
          </button>
        </form>
      }
    />
  );
}
