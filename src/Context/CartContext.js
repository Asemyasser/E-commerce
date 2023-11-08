import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserToken } from "./UserToken";

export let CartContext = createContext(0);
export default function CartContextProvider({ children }) {
  let [cartItems, setCartItems] = useState(0);
  let [cartId, setCartId] = useState(null);

  let { login } = useContext(UserToken);
  const BaseUrl = "https://ecommerce.routemisr.com";
  const headers = { token: login };
  function addCart(productId) {
    return axios
      .post(`${BaseUrl}/api/v1/cart`, { productId }, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function getCart() {
    return axios
      .get(`${BaseUrl}/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteCart(id) {
    return axios
      .delete(`${BaseUrl}/api/v1/cart/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function updateCart(id, count) {
    return axios
      .put(`${BaseUrl}/api/v1/cart/${id}`, { count }, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function checkout(id, shippingAddress) {
    return axios
      .post(
        `${BaseUrl}/api/v1/orders/checkout-session/${id}`,
        { shippingAddress },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addCart,
        getCart,
        deleteCart,
        updateCart,
        cartItems,
        setCartItems,
        checkout,
        cartId,
        setCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
