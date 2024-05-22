"use client"
import Button from "./Button"
import axios from "axios"
import { BACKEND_URL } from "@/utils"


export const Appbar  = () => {
    async function handleClick() {
        try{
            const response = await axios.get(`${BACKEND_URL}/v1/client/signin`)
            console.log(response.data)
            console.log("hi")
        }catch(error){
            console.error(error)
        }
        
    }
    return (
        <div>
            
            <Button onclick={handleClick} text="connect wallet"/>
        </div>
    )
}