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

export const NextBid = () => {
    const token = useRecoilValue(tokenAtom)
    // @ts-ignore
    const tokenData = token.token

    const getBid = async () => {
        const response = await axios.get(`${BACKEND_URL}/nextBid`, {
            headers: {
                Authorization: tokenData
            }
        
        })
        console.log(response.data)
    }

  return (
    <div>
      <Button onClick={getBid} text="get Bid" />
    </div>
  )

}