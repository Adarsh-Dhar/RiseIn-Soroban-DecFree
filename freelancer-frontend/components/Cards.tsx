"use client"
import React, { use } from 'react';
import Button from './Button';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { projectIdAtom } from '@/store/atoms/Project';
import { useRecoilValue, useSetRecoilState } from 'recoil';
interface CardProps {
    title: string;
    description: string;
    price: number;
    deadline : string
}

const Card = ({title , description , price, deadline} : CardProps) => {
    const setProjectId = useSetRecoilState(projectIdAtom)
    const handleClick = async () => {
        const response = await axios.post(`${BACKEND_URL}/selectProject`,{
            data : {
                title : title,
                description : description,
                price : price,
                
            }
        })
        setProjectId(response.data)
    }

    
    return (
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
    
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>
    
    <p className="mb-3 font-normal text-gray-700 ">{description}</p>
    <p className='text-sm font-medium'>{price}</p>
    <p className='text-sm font-medium'>{deadline}</p>

   <Button onClick ={handleClick} text='Select Project'/>
</div>

    );
};

export default Card;