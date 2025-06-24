import React from "react";
import axios from "axios";
import "./Login.css";
import { useFormik } from "formik";
import { createAccountStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const setUser = createAccountStore((state) => state.setUser);
  const setAccessToken = createAccountStore((state) => state.setAccessToken);
  const formik = useFormik({
    initialValues: {
      username: "",
      mail: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.mail) {
        errors.mail = "Pole wymagane";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mail)
      ) {
        errors.mail = "Nieprawidłowy adres e-mail";
      }
      if (!values.username) {
        errors.username = "Pole wymagane";
      }
      if (!values.name) {
        errors.name = "Pole wymagane";
      }
      if (!values.surname) {
        errors.surname = "Pole wymagane";
      }
      if (!values.password) {
        errors.password = "Pole wymagane";
      }
      if (
        values.confirmPassword &&
        values.confirmPassword !== values.password
      ) {
        errors.confirmPassword = "Hasła muszą być identyczne";
      }
      return errors;
    },
    onSubmit: (values) => {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "users", values, {
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
          console.error("Error fetching users:", error);
        });
    },
  });

  return (
    <div className="login">
      <form className="login__form" onSubmit={formik.handleSubmit}>
        <div className="login__title"> Zarejestruj się </div>
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
          <label htmlFor="username">
            Nazwa użytkownika<sup>*</sup>
          </label>
          <input
            type="text"
            name="username"
            className={`customInput ${
              formik.errors?.username && formik.touched?.username ? "error" : ""
            } `}
            value={formik.values?.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors?.username && formik.touched?.username && (
            <div className="customError">{formik.errors?.username}</div>
          )}
        </div>
        <div className="customFormElement">
          <label htmlFor="name">
            Imię<sup>*</sup>
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
          <label htmlFor="surname">
            Nazwisko<sup>*</sup>
          </label>
          <input
            type="text"
            name="surname"
            className={`customInput ${
              formik.errors?.surname && formik.touched?.surname ? "error" : ""
            } `}
            value={formik.values?.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors?.surname && formik.touched?.surname && (
            <div className="customError">{formik.errors?.surname}</div>
          )}
        </div>
        <div className="customFormElement">
          <label htmlFor="password">
            Hasło<sup>*</sup>
          </label>
          <input
            type="password"
            name="password"
            className={`customInput ${
              formik.errors?.password && formik.touched?.password ? "error" : ""
            } `}
            value={formik.values?.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors?.password && formik.touched?.password && (
            <div className="customError">{formik.errors?.password}</div>
          )}
        </div>
        <div className="customFormElement">
          <label htmlFor="confirmPassword">
            Powtórz hasło<sup>*</sup>
          </label>
          <input
            type="password"
            name="confirmPassword"
            className={`customInput ${
              formik.errors?.confirmPassword && formik.touched?.confirmPassword
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
        <Link to="/login" className="login__link">
          Masz już konto? Zaloguj się
        </Link>
        <button type="submit" className="customButton">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
