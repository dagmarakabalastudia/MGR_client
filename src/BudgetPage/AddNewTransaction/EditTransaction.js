import React from "react";
import "./AddNewTransaction.css";
import { useFormik } from "formik";
import Select from "react-select";
import ModalComponent from "../../ModalComponent/ModalComponent";
import moment from "moment";

export default function EditTransaction({
  transaction,
  setOpenPopupToAdd,
  onSubmitBehavior,
  user,

  categories,
}) {
  const formik = useFormik({
    initialValues: {
      _id: transaction._id,
      budget: transaction.budgetId,
      category: transaction.category._id,
      user: user,
      productName: transaction.productName,
      productCost: transaction.productCost,
      comment: transaction.comment,
      isExpense: transaction.isExpense,
      date: moment(transaction.date).format("YYYY-MM-DD"),
    },
    validate: (values) => {
      const errors = {};
      if (!values.date) {
        errors.date = "Pole wymagane";
      }
      if (!values.category) {
        errors.category = "Pole wymagane";
      }
      if (!values.productName) {
        errors.productName = "Pole wymagane";
      }
      if (!values.productCost) {
        errors.productCost = "Pole wymagane";
      }
      if (values.productCost <= 0) {
        errors.totalAmount = "Wartość nie może być ujemna";
      }

      return errors;
    },
    onSubmit: (values) => {
      onSubmitBehavior({
        ...values,
        category:
          categories[categories.findIndex((c) => c._id === values.category)],
      });
      setOpenPopupToAdd(false);
    },
  });

  return (
    <ModalComponent
      setOpenPopup={setOpenPopupToAdd}
      title={`Edytuj ${formik.values.isExpense ? "wydatek" : "przychód"}`}
      content={
        <form
          className="addNewTransaction__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="customFormElement">
            <label htmlFor="productName">
              Nazwa<sup>*</sup>
            </label>
            <input
              type="text"
              name="productName"
              className={`customInput ${
                formik.errors?.productName && formik.touched?.productName
                  ? "error"
                  : ""
              } `}
              value={formik.values?.productName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.productName && formik.touched?.productName && (
              <div className="customError">
                {formik.errors?.productName.toString()}
              </div>
            )}
          </div>

          <div className="customFormElement">
            <label htmlFor="productCost">
              Kwota (zł)<sup>*</sup>
            </label>
            <input
              type="number"
              name="productCost"
              step="0.01"
              min="0"
              className={`customInput ${
                formik.errors?.productCost && formik.touched?.productCost
                  ? "error"
                  : ""
              } `}
              value={
                formik.values?.productCost
                  ? parseFloat(formik.values?.productCost.toFixed(2))
                  : formik.values?.productCost
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.productCost && formik.touched?.productCost && (
              <div className="customError">
                {formik.errors?.productCost.toString()}
              </div>
            )}
          </div>
          <div className="customFormElement">
            <label htmlFor="date">
              Data<sup>*</sup>
            </label>
            <input
              type="date"
              name="date"
              className={`customInput ${
                formik.errors?.date && formik.touched?.date ? "error" : ""
              } `}
              value={formik.values?.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.date && formik.touched?.date && (
              <div className="customError">
                {formik.errors?.date.toString()}
              </div>
            )}
          </div>
          <div className="customFormElement">
            <label>
              Kategoria<sup>*</sup>
            </label>
            <Select
              options={categories.map((c) => {
                return { value: c._id, label: c.name };
              })}
              onChange={(el) => {
                formik.setValues({ ...formik.values, category: el.value });
              }}
              placeholder=" "
              name="category"
              value={
                formik.values?.category &&
                categories
                  .map((c) => {
                    return { value: c._id, label: c.name };
                  })
                  .findIndex((c) => c.value === formik.values?.category) >= 0
                  ? categories.map((c) => {
                      return { value: c._id, label: c.name };
                    })[
                      categories
                        .map((c) => {
                          return { value: c._id, label: c.name };
                        })
                        .findIndex((c) => c.value === formik.values?.category)
                    ]
                  : undefined
              }
            />
            {formik.errors?.category && formik.touched?.category && (
              <div className="customError">
                {formik.errors?.category.toString()}
              </div>
            )}
          </div>
          <div className="customFormElement">
            <label htmlFor="comment">Notatka</label>
            <textarea
              name="comment"
              className="customTextarea"
              value={formik.values?.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.comment && formik.touched?.comment && (
              <div className="customError">
                {formik.errors?.comment.toString()}
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
