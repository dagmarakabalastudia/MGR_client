import React from "react";
import axios from "axios";
import "./Login.css";
import { useFormik } from "formik";
import { createAccountStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { ToastProvider, useToast } from "../ToastComponent/ToastComponent";

export default function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const setUser = createAccountStore((state) => state.setUser);
  const setAccessToken = createAccountStore((state) => state.setAccessToken);
  const formik = useFormik({
    initialValues: { mail: "", password: "" },
    validate: (values) => {
      const errors = {};
      if (!values.mail) {
        errors.mail = "Pole wymagane";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mail)
      ) {
        errors.mail = "Nieprawidłowy adres e-mail";
      }
      if (!values.password) {
        errors.password = "Pole wymagane";
      }
      return errors;
    },
    onSubmit: (values) => {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "users/login", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUser(response.data.user);
          setAccessToken(response.data.token);
          navigate("/");
        })
        .catch((error) => {
          addToast(
            error?.response?.data.error
              ? error?.response?.data.error
              : "Wystąpił błąd",
            "error"
          );
        });
    },
  });

  return (
    <ToastProvider>
      <div className="login">
        <form className="login__form" onSubmit={formik.handleSubmit}>
          <div className="login__title"> Zaloguj się </div>
          <div className="customFormElement">
            <label htmlFor="mail">
              E-mail<sup>*</sup>
            </label>
            <input
              type="text"
              name="mail"
              className={`customInput ${
                formik.errors?.mail && formik.touched?.mail ? "error" : ""
              } `}
              value={formik.values?.mail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.mail && formik.touched?.mail && (
              <div className="customError">{formik.errors?.mail}</div>
            )}
          </div>
          <div className="customFormElement">
            <label htmlFor="mail">
              Hasło<sup>*</sup>
            </label>
            <input
              type="password"
              name="password"
              className={`customInput ${
                formik.errors?.password && formik.touched?.password
                  ? "error"
                  : ""
              } `}
              value={formik.values?.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors?.password && formik.touched?.password && (
              <div className="customError">{formik.errors?.password}</div>
            )}
          </div>
          <Link to="/register" className="login__link">
            Nie masz konta? Załóż je
          </Link>
          <button type="submit" className="customButton">
            Zaloguj
          </button>
        </form>
      </div>{" "}
    </ToastProvider>
  );
}
