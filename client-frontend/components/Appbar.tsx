"use client"

import { useState, useEffect, use } from "react"
import Button from "./Button"
import {retrievePublicKey, checkConnection, userSignTransaction} from "./Freighter"
import axios from "axios"
import { BACKEND_URL } from "@/utils"
import { get } from "http"
import { publicKeyAtom } from "@/store/atoms/Key";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenAtom } from "@/store/atoms/Tokens"

export const Appbar = () => {
  const publicKey = useRecoilValue(publicKeyAtom)
  const getPublicKey = useSetRecoilState(publicKeyAtom)
  const token = useRecoilValue(tokenAtom)
  const setToken = useSetRecoilState(tokenAtom)
  const [connect, getConnected] = useState("Connect")
 

  
    async function connectWallet() {
         if (await checkConnection()) {
            
            getConnected("Connected");
            getPublicKey(await retrievePublicKey());
            console.log(publicKey);
    }

    const response = await axios.post(`${BACKEND_URL}/signin`,{
        publicKey
    })

    setToken(response.data)
   }
      
    
  
  return (
    <div>
      <Button onclick={connectWallet} text="Connect Wallet" />
    </div>
  )

}