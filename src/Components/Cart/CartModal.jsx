import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function CartModal() {
  let { checkout, cartId } = useContext(CartContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function submitForm(values) {
    let res = await checkout(cartId, values);
    if (res?.data?.status === "success") {
      window.location.href = res?.data?.session.url;
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: submitForm,
  });

  return (
    <>
      <Button className="bg-main " onClick={handleShow}>
        Check Out
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                placeholder="eg. El Nozha, New Cairo City & Dokki"
                autoFocus
              />
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder="e.g. 01XXXXXXXXX"
                autoFocus
              />
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                placeholder="eg. Cairo"
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" className="bg-main" onClick={handleClose}>
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
