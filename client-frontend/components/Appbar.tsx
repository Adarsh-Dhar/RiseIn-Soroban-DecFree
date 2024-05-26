"use client"

import { useState, useEffect } from "react"
import Button from "./Button"
import { isConnected, requestAccess} from "@stellar/freighter-api"
import axios from "axios"
import { BACKEND_URL } from "@/utils"

export const Appbar = () => {
  const [publicKey, setPublicKey] = useState("")
  const [signedXdr, setSignedXdr] = useState("")
  const [error, setError] = useState(null)

  
    const connectWallet = async () => {
      if (!isConnected()) {
        // @ts-ignore
        setError("Freighter extension is not installed or connected.")
        return
      }

      try {
        const pubKey = await requestAccess()
        setPublicKey(pubKey)
        console.log("User's public key:", pubKey)
        console.log("hello")
      } catch (e) {
        // @ts-ignore
        setError(e)
      }


      try{
        const response = await axios.post(`${BACKEND_URL}/client/signin/${publicKey}`)
        console.log(response.data)
        console.log("hi")

      }catch(e){
        // @ts-ignore
        console.log(e)
      
      }
    }
    useEffect(() => {
    connectWallet()
  }, [])

 

  
  return (
    <div>
      <Button onclick={connectWallet} text="Connect Wallet" />
    </div>
  )
}