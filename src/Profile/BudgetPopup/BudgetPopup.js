import React from "react";

import "./BudgetPopup.css";
import { useFormik } from "formik";
import ModalComponent from "../../ModalComponent/ModalComponent";

export default function BudgetPopup({
  setOpenPopupToAdd,
  onSubmitBehavior,
  user,
}) {
  const formik = useFormik({
    initialValues: {
      owner: user.id,
      name: "",
      totalAmount: 0,
      participants: [],
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.totalAmount) {
        errors.totalAmount = "Required";
      }
      return errors;
    },
    onSubmit: (values) => {
      onSubmitBehavior(values);
    },
  });
  return (
    <ModalComponent
      setOpenPopup={setOpenPopupToAdd}
      title={`Dodaj nowy budżet`}
      content={
        <form className="budgetPopup__form" onSubmit={formik.handleSubmit}>
          <div className="customFormElement">
            <label htmlFor="name">
              Nazwa<sup>*</sup>
            </label>
            <input
              type="text"
              name="name"
              className={`customInput ${
                formik.errors?.name && formik.touched?.name ? "error" : ""
              } `}
              value={formik.values?.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.name && formik.touched?.name && (
              <div className="customError">{formik.errors?.name}</div>
            )}
          </div>

          <div className="customFormElement">
            <label htmlFor="moneyLimit">
              Limit (zł)<sup>*</sup>
            </label>
            <input
              type="number"
              name="totalAmount"
              className={`customInput ${
                formik.errors?.totalAmount && formik.touched?.totalAmount
                  ? "error"
                  : ""
              } `}
              value={formik.values?.totalAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.totalAmount && formik.touched?.totalAmount && (
              <div className="customError">{formik.errors?.totalAmount}</div>
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
