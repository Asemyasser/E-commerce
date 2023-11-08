import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { UserToken } from "../../Context/UserToken";
import { CartContext } from "../../Context/CartContext";
import CartModal from "./CartModal";
import Loading from "../Loading/Loading";

export default function Cart() {
  let { getCart, deleteCart, updateCart, setCartItems, setCartId } =
    useContext(CartContext);
  let { login } = useContext(UserToken);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);

  async function getCartFun() {
    setLoading(true);
    let res = await getCart();
    if (res?.data?.status === "success") {
      setData(res?.data);
      setCartItems(res?.data.numOfCartItems);
      setCartId(res?.data.data._id);
      setLoading(false);
    }
    setLoading(false);
  }

  async function deleteCartFun(id) {
    let res = await deleteCart(id);
    if (res?.data?.status === "success") {
      getCartFun();
    }
  }

  async function updateCartFun(id, count) {
    let res = await updateCart(id, count);

    if (res?.data?.status === "success") {
      getCartFun();
    }

    if (count === 0) {
      deleteCartFun(id);
      getCartFun();
    }
  }

  useEffect(() => {
    if (login == null) return;
    getCartFun();
  }, [login]);

  if (loading)
    return (
      <div className="container ">
        <h3 className="my-3 text-left">your cart is loading ...</h3>
        <Loading></Loading>
      </div>
    );
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <div className="container my-2">
        <div className="cart-box bg-main-light p-3 my-2">
          <h1>Shop Cart</h1>
          <h2 className="h4 my-3 text-main">
            Total Cart Price: {data?.data.totalCartPrice} EG
          </h2>
          {data?.data.products.map((prod) => (
            <div key={prod.product._id} className="row">
              <div className="col-md-9">
                <div className="row my-3 align-items-center">
                  <div className="col-md-1">
                    <img
                      src={prod.product.imageCover}
                      className="w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-md-11">
                    <p>{prod.product.title}</p>
                    <p className="text-main">{prod.price} EG</p>
                    <span
                      onClick={() => {
                        deleteCartFun(prod.product._id);
                      }}
                      className="cursor-pointer"
                    >
                      <i className="fa-solid fa-trash text-main"></i>
                      Remove
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-3 align-self-center">
                <button
                  onClick={() => {
                    updateCartFun(prod.product._id, prod.count + 1);
                  }}
                  className="btn bg-main border-1 border-success p-1"
                >
                  +
                </button>
                <span className="mx-2">{prod.count}</span>
                <button
                  onClick={() => {
                    updateCartFun(prod.product._id, prod.count - 1);
                  }}
                  className="btn bg-main border-1 border-success p-1"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mb-2">
        <CartModal />
      </div>
    </>
  );
}
