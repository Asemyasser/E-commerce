import React, { useContext, useEffect } from "react";
import "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Brands from "./Components/Brands/Brands";
import { UserToken } from "./Context/UserToken";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails";
import Orders from "./Components/Orders/Orders";
import toast, { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";

export default function App() {
  const { setLogin } = useContext(UserToken);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setLogin(localStorage.getItem("userToken"));
    }
  });

  const routes = createHashRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        { path: "products", element: <Products></Products> },
        { path: "allorders", element: <Orders></Orders> },
        { path: "categories", element: <Categories></Categories> },
        {
          path: "productdetails/:id",
          element: <ProductDetails></ProductDetails>,
        },
        { path: "login", element: <Login></Login> },
        { path: "brands", element: <Brands></Brands> },
        { path: "register", element: <Register></Register> },
        { path: "*", element: <Notfound></Notfound> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </>
  );
}
