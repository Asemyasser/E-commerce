import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import useApi from "../../hooks/useApi";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loading from "../Loading/Loading";

export default function Brands() {
  let { isLoading, data } = useApi("brands", "brands");
  const [show, setShow] = useState(false);

  const [brand, setBrand] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (brand.length === 0) return;
    handleShow();
    console.log(brand);
  }, [brand]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>

      <div className="container my-5">
        <h1 className=" text-main text-center fw-bolder mb-5">All Brands</h1>
        <div className="row gy-4">
          {data?.data.data.map((brand) => (
            <div key={brand._id} className="col-md-3 text-center">
              <div
                onClick={() => {
                  setBrand(brand);
                }}
                className="card d-flex flex-column cursor-pointer p-3"
              >
                <img src={brand.image} className="w-100" alt="" />
                <p className="fw-bolder">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6">
                <h1 className="text-main">{brand.name}</h1>
                <p>{brand.name}</p>
              </div>
              <div className="col-md-6">
                <img src={brand.image} className="w-100" alt="" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
