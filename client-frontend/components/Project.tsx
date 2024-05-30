"use client"
import React, { useEffect } from 'react';
import Button from './Button';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import {  descriptionAtom, priceAtom, titleAtom } from '@/store/atoms/Products';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { tokenAtom } from '@/store/atoms/Tokens';

const Project = () => {
  const token = useRecoilValue(tokenAtom)
  // @ts-ignore
  const tokenData = token.token

    const handleClick = async () => {
      

      try{
        const response = await axios.post(`${BACKEND_URL}/projects`,{
          title,
          description,
          price : parseInt(price),
      },{
        headers: {
          Authorization: tokenData
        }
      
      })
      console.log(response.data)
      }catch(error){
        console.log(error)
      }

      useEffect(() => {
        handleClick()
      },[title,description,price,token])
        
        
    }
    const title = useRecoilValue(titleAtom);
    const setTitle = useSetRecoilState(titleAtom);
    const description = useRecoilValue(descriptionAtom);
    const setDescription = useSetRecoilState(descriptionAtom);
    const price = useRecoilValue(priceAtom);
    const setPrice = useSetRecoilState(priceAtom);
  
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-6">
          <div className="relative">
            <input
              type="text"
              id="title"
              className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="title"
              className="absolute left-0 -top-1.5 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all"
            >
              Title
            </label>
          </div>
      
          <div className="relative">
            <input
              type="text"
              id="description"
              className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label
              htmlFor="description"
              className="absolute left-0 -top-1.5 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all"
            >
              Description
            </label>
          </div>
      
          <div className="relative">
            <input
              type="number"
              id="price"
              className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label
              htmlFor="price"
              className="absolute left-0 -top-1.5 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all"
            >
              Price
            </label>
          </div>
      
          
        <div className="relative">

        <Button onclick={handleClick} text='publish project'/>
        </div>

          </div>
        </div>
      
    );
};

export default Project;