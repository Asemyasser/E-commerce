import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserToken } from "../../Context/UserToken";
import { Helmet } from "react-helmet";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLogin } = useContext(UserToken);

  async function submitLogin(values) {
    setLoading(true);
    const BaseUrl = "https://ecommerce.routemisr.com";
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/signin`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
    if (data.message === "success") {
      setError("");
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      setLogin(data.token);
      navigate("/cart");
    }
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
    email: Yup.string()
      .email("Email is not validate")
      .required("Email is required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{8,}$/, "Password is not validate")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate: validation,
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="container ">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="w-75 my-5 mx-auto"
        >
          <h2>Login Now:</h2>
          {error ? <p className="alert alert-danger my-3">{error}</p> : ""}
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
              Login
            </button>
          )}
        </form>
      </div>
      ;
    </>
  );
}
