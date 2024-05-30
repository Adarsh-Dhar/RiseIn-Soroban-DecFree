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
import { fetchPoll } from "./Soroban"
import { yesAtom, noAtom, totalAtom } from "@/store/atoms/Votes";

export const Appbar = () => {
  const publicKey = useRecoilValue(publicKeyAtom)
  const getPublicKey = useSetRecoilState(publicKeyAtom)
  const token = useRecoilValue(tokenAtom)
  const setToken = useSetRecoilState(tokenAtom)
  const [connect, getConnected] = useState("Connect")
  const yesCount = useRecoilValue(yesAtom)
  const setYesCount = useSetRecoilState(yesAtom)
  const noCount = useRecoilValue(noAtom)
  const setNoCount = useSetRecoilState(noAtom)
  const total = useRecoilValue(totalAtom)
  const setTotal = useSetRecoilState(totalAtom)

  useEffect(() => {
    if(publicKey !== ""){
      getConnected("Connected")
          fetchPoll(publicKey).then((values) => {
            console.log(fetchVotes(values))
          })
          
    }
    
  },[publicKey])
 

  
    async function connectWallet() {
      if (await checkConnection()) {
        let publicKey = await retrievePublicKey();
        getPublicKey(publicKey);
        console.log(publicKey)
      }

    const response = await axios.post(`${BACKEND_URL}/signin`,{
        publicKey
    })

    setToken(response.data)
   }

   async function getVoter(){

   }

  const fetchVotes = async (values : Array<string>) => {
   setNoCount(parseInt(values[0]))
   setTotal(parseInt(values[1]))
   setYesCount(parseInt(values[2]))
  
  
   console.log(noCount, total, yesCount)
  }
      
    
  
  return (
    <div>
      <Button onClick={connectWallet} text="Connect Wallet" />
      <div>noCount = {noCount}</div>
      <div>yesCount = {yesCount}</div>

      <div>total = {total}</div>
    </div>
  )

}