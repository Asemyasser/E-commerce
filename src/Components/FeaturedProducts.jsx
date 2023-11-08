import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { UserToken } from "../Context/UserToken";
import useApi from "../hooks/useApi";
import Loading from "./Loading/Loading";

export default function FeaturedProducts() {
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

  // const [loading, setLoading] = useState(false);

  // const [productsArr, setProductArr] = useState([]);

  const BaseUrl = "https://ecommerce.routemisr.com";
  // async function getProducts() {
  //   setLoading(true);
  //   const { data } = await axios.get(`${BaseUrl}/api/v1/products`);
  //   setProductArr(data.data);
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);
  let { isLoading, data } = useApi("products", "products");

  if (isLoading) return <Loading />;
  return (
    <div className="container">
      <div className="row">
        {data?.data.data.map((product) => (
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
              <button
                onClick={() => {
                  addCartFun(product._id);
                }}
                className="btn bg-main text-white my-2"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
