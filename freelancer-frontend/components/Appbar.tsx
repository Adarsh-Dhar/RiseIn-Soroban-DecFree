"use client"
import Button from "./Button";
import React from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";

export const Appbar = () => {
  const handleClick = () => {
    // Handle button click
    const response = axios.get(`${BACKEND_URL}/v1/freelancer/availableProjects`);
  };

  return (
    <div>
      <Button text="connect wallet" onClick={handleClick} />
    </div>
  );
};