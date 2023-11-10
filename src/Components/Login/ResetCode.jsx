import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ResetCode({ isValid, dirty, forgotLoading }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function codeSubmit(values) {
    setLoading(true);

    const BaseUrl = "https://ecommerce.routemisr.com";
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/verifyResetCode`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
        console.log(data);
      });
    if (data.status === "Success") {
      setError("");
      setLoading(false);
      navigate("/reset-password");
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: codeSubmit,
  });

  return (
    <>
      {forgotLoading ? (
        <button className="btn form-btn text-white">
          <i className="fa-solid fa-spin fa-spinner"></i>
        </button>
      ) : (
        <Button
          type="submit"
          disabled={!(isValid && dirty)}
          className="btn form-btn text-white fs-5"
          onClick={handleShow}
        >
          Verfiy
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your verification code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {error ? <p className="alert alert-danger my-3">{error}</p> : ""}

              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                name="resetCode"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {loading ? (
              <button className="btn form-btn text-white">
                <i className="fa-solid fa-spin fa-spinner"></i>
              </button>
            ) : (
              <Button type="submit" className="btn form-btn">
                Send
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
