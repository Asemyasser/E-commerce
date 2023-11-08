import React from "react";
import { Helmet } from "react-helmet";
import useApi from "../../hooks/useApi";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Products() {
  let { isLoading, data } = useApi("products", "products");

  if (isLoading) return <Loading />;
  return (
    <div className="container my-5">
      <h1 className="text-main mb-5 text-center fw-bolder">
        Top Rating Products
      </h1>
      <div className="row">
        {data?.data.data
          .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
          .slice(0, 10)
          .map((product) => (
            <div className="col-md-2 " key={product._id}>
              <div className="product p-3">
                <Link to={`productdetails/${product.id}`}>
                  <img src={product.imageCover} className="w-100" alt="" />
                  <p className="text-main">{product.category.name}</p>
                  <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                  <div className="product-box d-flex justify-content-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fa-solid fa-star rating-color "></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
    </div>
  );
}
