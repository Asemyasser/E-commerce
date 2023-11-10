import React from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import useApi from "../../hooks/useApi";

export default function Categories() {
  let { isLoading, data } = useApi("categories", "categories", "get");

  if (isLoading) return <Loading />;
  return (
    <div className="container my-5">
      <div className="row gy-4">
        {data?.data.data.map((cat) => (
          <div key={cat._id} className="col-md-4">
            <div className="card cursor-pointer">
              <img
                src={cat.image}
                height={300}
                className="w-100 object-fit-cover"
                alt=""
              />
              <p className="p-3 text-success fw-bolder h3 text-center">
                {cat.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
    </div>
  );
}
