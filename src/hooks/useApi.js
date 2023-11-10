import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function useApi(key, endPoint, method) {
  const BaseUrl = "https://ecommerce.routemisr.com";
  function getData() {
    return axios.get(`${BaseUrl}/api/v1/${endPoint}`);
  }

  function postData() {
    return axios.get(`${BaseUrl}/api/v1/${endPoint}`);
  }

  return useQuery(key, method === "get" ? getData : postData);
}
