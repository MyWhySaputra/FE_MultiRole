import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="mx-2 pb-20">
      <h1 className="mt-2">Dashboard</h1>
      <h2>
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
