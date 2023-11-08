import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { UserToken } from "../Context/UserToken";
import toast from "react-hot-toast";
import Loading from "./Loading/Loading";

export default function ProductDetails() {
  let { addCart, setCartItems } = useContext(CartContext);
  let { login } = useContext(UserToken);
  async function addCartFun(id) {
    let res = await addCart(id);
    setCartItems(res?.data.numOfCartItems);

    console.log(res);

    if (!login) {
      toast.error(res.response.data.message);
      return;
    }
    toast.success(res.data.message);
  }

  const BaseUrl = "https://ecommerce.routemisr.com";
  const { id } = useParams();
  function getData() {
    return axios.get(`${BaseUrl}/api/v1/products/${id}`);
  }

  const { isLoading, data } = useQuery("productdetails", getData);
  console.log(data?.data);

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-3">
          <img src={data?.data.data.imageCover} className="w-100" alt="" />
        </div>
        <div className="col-md-9">
          <p>{data?.data.data.title}</p>
          <p>{data?.data.data.description}</p>
          <p>{data?.data.data.category.name}</p>
          <div className="d-flex justify-content-between">
            <span>{data?.data.data.price}EG</span>
            <span>
              {data?.data.data.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
          <button
            onClick={() => {
              addCartFun(data.data.data.id);
            }}
            className="btn form-control bg-main text-white"
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
