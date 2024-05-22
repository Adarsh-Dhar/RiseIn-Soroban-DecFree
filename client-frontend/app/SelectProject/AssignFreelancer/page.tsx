"use client"
import Button from "@/components/Button";
import React from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";

export const AssignProject = () => {
    const handleClick = () => {
        const response = axios.get(`${BACKEND_URL}/v1/client/bids`)
    }
    return(
        <div>
            <Button onclick={handleClick} text="Show all bids"/>
        </div>
    )
}