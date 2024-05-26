"use client"

import Button from "./Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";
import Card from "./Cards";

export const Project = () => {
  const [projects, setProjects] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/availableProjects`);
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button text="Available Projects" onClick={handleClick} />
      {projects.map((project, index) => (
        <Card
          key={index}
          // @ts-ignore
          title={project.title}
          // @ts-ignore
          description={project.description}
          // @ts-ignore
          price={project.price}
          // @ts-ignore
          deadline={project.deadline}
        />
      ))}
      
      {projects.map((project, index) => (
        // @ts-ignore
        <div key={index}>{project.id}</div>
      ))}
    </div>
  );
};