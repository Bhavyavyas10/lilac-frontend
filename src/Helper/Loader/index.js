import React from "react";
import Loader from "react-loader-spinner";

const Loaders = () => {
  return (
    <Loader
      type="BallTriangle"
      color="#3187ed"
      height={100}
      width={100}
      visible={true}
    />
  );
};

export default Loaders;
