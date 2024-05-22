"use client"
import React from 'react';
import Button from './Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { deadlineAtom, priceAtom } from '@/store/atoms/Bids';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';

const Bid = () => {
  const price = useRecoilValue(priceAtom);
    const setPrice = useSetRecoilState(priceAtom);
    const deadline = useRecoilValue(deadlineAtom);
    const setDeadline = useSetRecoilState(deadlineAtom);


    const handleClick = () => {
        const response = axios.post(`${BACKEND_URL}/v1/freelancer/bid`)
  }


    return (
        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-6">
          
      
          <div className="relative">
            <input
              type="text"
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
          <input
        type="date"
        id="deadline"
        className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
        autoComplete="off"
        value={deadline.toString()} // Convert deadline to string
        onChange={(e) => setDeadline(new Date(e.target.value))}
      />
     <label
        htmlFor="deadline"
        className="ml-2 text-gray-600 peer-focus:text-purple-600 transition-colors"
        >
        Deadline
        </label>
        <div className="relative">

        <Button onClick={handleClick} text='publish Bid'/>
        </div>

          </div>
        </div>
      </div>
    );
};


export default Bid;