import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitRegister(values) {
    setLoading(true);
    const BaseUrl = "https://ecommerce.routemisr.com";
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/signup`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
    if (data.message === "success") {
      setError("");
      setLoading(false);
      navigate("/login");
    }
    console.log(data);
  }

  // function validation(values) {
  //   const errors = {};
  //   if (!values.name) errors.name = "Name is Required";
  //   else if (!/^[A-Z][a-z0-9]{2,5}$/.test(values.name))
  //     errors.name =
  //       "Name is not Matched, should start with a capital letter then 2 to five letters";

  //   if (!values.email) errors.email = "Email is Required";
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/.test(values.email))
  //     errors.email = "Email is not Valid";
  //   return errors;
  // }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "min 2 characters")
      .max(10, "max 10 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Email is not validate")
      .required("Email is required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{8,}$/, "Password is not validate")
      .required("Password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword is not matched with password")
      .required("rePassword is required"),

    phone: Yup.string()
      .matches(/^(002)?01[0-25][0-9]{8}$/, "Phone number is not correct")
      .required("Phone number is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate: validation,
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="container ">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="w-75 my-5 mx-auto"
        >
          <h2>Register Now:</h2>
          {error ? <p className="alert alert-danger my-3">{error}</p> : ""}
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            className="form-control mb-3"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="on"
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger">{formik.errors.name}</p>
          ) : (
            ""
          )}

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            className="form-control mb-3"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="on"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            className="form-control mb-3"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="on"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword: </label>
          <input
            type="password"
            id="rePassword"
            className="form-control mb-3"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="on"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone: </label>
          <input
            type="tel"
            id="phone"
            className="form-control mb-3"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="on"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert alert-danger">{formik.errors.phone}</p>
          ) : (
            ""
          )}

          {loading ? (
            <button className="btn ms-auto d-block form-btn float-end text-white">
              <i className="fa-solid fa-spin fa-spinner"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="btn ms-auto d-block form-btn float-end text-white"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Register
            </button>
          )}
        </form>
      </div>
      ;
    </>
  );
}
