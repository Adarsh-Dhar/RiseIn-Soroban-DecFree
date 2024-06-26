"use client"
import React, { use } from 'react';
import Button from './Button';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdAtom } from '@/store/atoms/ProjectId';
interface CardProps {
    title: string;
    description: string;
    price: number;
}

const Card = ({title , description , price} : CardProps) => {
    const projectId = useRecoilValue(projectIdAtom)
    
    const handleClick = async () => {
        const response = await axios.get(`${BACKEND_URL}/bids`,{
            data : {
                projectId : projectId
            }
        })
    }

    
    return (
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
    
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>
    
    <p className="mb-3 font-normal text-gray-700 ">{description}</p>
    <p className='text-sm font-medium'>{price}</p>

   <Button onclick ={handleClick} text='See All Bids'/>
</div>

    );
};

export default Card;