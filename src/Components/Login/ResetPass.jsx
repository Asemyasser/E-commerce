import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPass() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitRegister(values) {
    setLoading(true);
    const BaseUrl = "https://ecommerce.routemisr.com";
    let { data } = await axios
      .put(`${BaseUrl}/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
    if (data.token) {
      setError("");
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      navigate("/login");

      console.log(data);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not validate")
      .required("Email is required"),

    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{8,}$/, "Password is not validate")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    // validate: validation,
    validationSchema,
    onSubmit: submitRegister,
  });
  return (
    <div className="container my-3">
      <h2 className="fw-bolder">Reset your account password</h2>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="ng-pristine ng-invalid ng-touched"
      >
        {error ? <p className="alert alert-danger my-3">{error}</p> : ""}

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="name@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="on"
          className="form-control mb-2"
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <label htmlFor="password">newPassword: </label>
        <input
          type="password"
          id="password"
          className="form-control mb-3"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="on"
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <p className="alert alert-danger">{formik.errors.newPassword}</p>
        ) : (
          ""
        )}

        {loading ? (
          <button className="btn form-btn text-white">
            <i className="fa-solid fa-spin fa-spinner"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="btn form-btn text-white"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Reset
          </button>
        )}
      </form>
    </div>
  );
}
