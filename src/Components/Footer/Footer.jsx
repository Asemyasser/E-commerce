import React from "react";

export default function Footer() {
  return (
    <footer className="bg-main-light py-5">
      <div className="container">
        <h1>Get the FreshCart app</h1>
        <p>We will send you a link, open it on your phone to downoad the app</p>
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              placeholder="Email .."
              className="form-control "
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-success form-control">
              Share App Link
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
