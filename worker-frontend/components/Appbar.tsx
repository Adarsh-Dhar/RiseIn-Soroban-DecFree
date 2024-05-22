"use client"
import Button from "./Button";
import React from "react";

export const Appbar = () => {
  const handleClick = () => {
    // Handle button click
    console.log("connect to wallet");
  };

  return (
    <div>
      <Button text="connect wallet" onClick={handleClick} />
    </div>
  );
};