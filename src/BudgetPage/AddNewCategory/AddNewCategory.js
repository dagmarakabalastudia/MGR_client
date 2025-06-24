import React from "react";
import "./AddNewCategory.css";
import { useFormik } from "formik";
import ModalComponent from "../../ModalComponent/ModalComponent";
import Select from "react-select";

export default function AddNewCategory({
  setOpenPopupToAdd,
  onSubmitBehavior,
  iconsList,
  budgetId,
}) {
  const formik = useFormik({
    initialValues: {
      budget: budgetId,
      name: "",
      color: undefined,
      icon: undefined,
      moneyLimit: 0,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Pole wymagane";
      }
      if (!values.color) {
        errors.color = "Pole wymagane";
      }
      if (!values.moneyLimit) {
        errors.moneyLimit = "Pole wymagane";
      }
      if (values.moneyLimit <= 0) {
        errors.moneyLimit = "Wartość musi być dodatnia";
      }

      return errors;
    },
    onSubmit: (values) => {
      setOpenPopupToAdd(false);
      onSubmitBehavior(values);
    },
  });
  return (
    <ModalComponent
      setOpenPopup={setOpenPopupToAdd}
      title={`Dodaj nową kategorię`}
      content={
        <form className="addNewCategory__form" onSubmit={formik.handleSubmit}>
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
              name="moneyLimit"
              className={`customInput ${
                formik.errors?.moneyLimit && formik.touched?.moneyLimit
                  ? "error"
                  : ""
              } `}
              value={formik.values?.moneyLimit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.moneyLimit && formik.touched?.moneyLimit && (
              <div className="customError">{formik.errors?.moneyLimit}</div>
            )}
          </div>
          <div className="customFormElement">
            <label>Ikona</label>
            <Select
              options={iconsList}
              onChange={(el) => {
                formik.setValues({ ...formik.values, icon: el.value });
              }}
              name="icon"
              value={
                formik.values?.icon &&
                iconsList.findIndex((c) => c.value === formik.values?.icon) >= 0
                  ? iconsList[
                      iconsList.findIndex(
                        (c) => c.value === formik.values?.icon
                      )
                    ]
                  : undefined
              }
            />
            {formik.errors?.icon && formik.touched?.icon && (
              <div className="customError">
                {formik.errors?.icon.toString()}
              </div>
            )}
          </div>
          <div className="customFormElement">
            <label htmlFor="color">
              Kolor<sup>*</sup>
            </label>
            <input
              type="color"
              name="color"
              defaultValue={"#ffffff"}
              className={`customInput ${
                formik.errors?.color && formik.touched?.color ? "error" : ""
              } `}
              value={formik.values?.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.color && formik.touched?.color && (
              <div className="customError">
                {formik.errors?.color.toString()}
              </div>
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
