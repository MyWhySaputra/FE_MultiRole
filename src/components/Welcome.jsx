import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="ml-2 mt-2">Dashboard</h1>
      <h2 className="ml-2 ">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
