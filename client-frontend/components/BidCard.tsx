"use client"
import React, { use } from 'react';
import Button from './Button';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdAtom } from '@/store/atoms/ProjectId';
interface CardProps {
    id: string;
    maxVotes: boolean;
    
}

const Card = ({id,maxVotes} : CardProps) => {
    const projectId = useRecoilValue(projectIdAtom)
    
    const handleClick = async () => {
        
    }

    
    return (
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
    
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{id}</h5>
    
    <p className="mb-3 font-normal text-gray-700 ">{maxVotes}</p>
    

   <Button onclick ={handleClick} text='Show Votes'/>
</div>

    );
};

export default Card;