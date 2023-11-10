import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import ResetCode from "./ResetCode";
import CartModal from "../Cart/CartModal";

export default function ForgotPass() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function verfiyEmail(values) {
    setLoading(true);

    const BaseUrl = "https://ecommerce.routemisr.com";
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/forgotPasswords`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
        console.log(data);
      });
    if (data.statusMsg === "success") {
      setError("");
      toast.success(data.message);
      setLoading(false);
      console.log(data);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not validate")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,
    onSubmit: verfiyEmail,
  });

  return (
    <div className="container my-3">
      <h2 className="fw-bolder">please enter your email</h2>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="ng-pristine ng-invalid ng-touched"
      >
        {error ? <p className="alert alert-danger my-3">{error}</p> : ""}

        <input
          type="email"
          id="email"
          placeholder="name@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="on"
          className="form-control mt-4 mb-2 p-3 fs-5"
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <ResetCode
          isValid={formik.isValid}
          forgotLoading={loading}
          dirty={formik.dirty}
        />
      </form>
    </div>
  );
}
