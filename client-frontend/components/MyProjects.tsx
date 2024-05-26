"use client"

import Button from "./Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";
import Card from "./ProjectCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { projectIdAtom } from "../store/atoms/ProjectId";

export const Project = () => {
  const [projects, setProjects] = useState([]);
  const projectId = useRecoilValue(projectIdAtom);
  const setProjectId = useSetRecoilState(projectIdAtom);

  const handleClick = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/myProjects`);
      setProjects(response.data);
      setProjectId(response.data[0].id);
   } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div>
      <Button text="Available Projects" onclick={handleClick} />
      {projects.map((project, index) => (
        <Card
          key={index}
          // @ts-ignore
          title={project.title}
          // @ts-ignore
          description={project.description}
          // @ts-ignore
          price={project.price}
          
        />
      ))}
      
      
    </div>
  );
};