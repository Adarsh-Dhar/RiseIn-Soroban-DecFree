"use client"
import Button from "./Button"
import axios from "axios"
import { BACKEND_URL } from "@/utils"
import {
    isConnected,
    requestAccess,
    signAuthEntry,
    signTransaction,
    signBlob,
  } from "@stellar/freighter-api";


export const Appbar  = () => {
    const retrievePublicKey = async () => {
        if (!isConnected()) {
            return ;
        }
            let publicKey = "";
            let error = "";
          
            try {
              publicKey = await requestAccess();
            } catch (e) {
                // @ts-ignore
              error = e;
            }
          
            if (error) {
              return error;
            }
          
            return publicKey;
          };
          return(
            <div>
                <Button onClick={retrievePublicKey} text="connect wallet" />
            </div>
         )
          }
        


         
         
   
      

    

    
      
        

    
