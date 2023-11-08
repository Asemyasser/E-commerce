import React from "react";
import error from "../../assets/images/error.svg";
export default function Notfound() {
  return (
    <div className="notfound">
      <div className="container d-flex flex-column  align-items-center my-5">
        <h1>NotFound</h1>
        <img src={error} alt="" />
      </div>
    </div>
  );
}
