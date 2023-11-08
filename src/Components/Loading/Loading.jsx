import React from "react";
import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="loading">
      <BeatLoader size={20} color="#4fa94d" />
    </div>
  );
}
