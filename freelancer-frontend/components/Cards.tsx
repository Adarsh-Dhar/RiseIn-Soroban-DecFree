"use client"
import React from 'react';
import Button from './Button';

interface CardProps {
    title: string;
    description: string;
    price: number;
    deadline : Date
}

const Card = () => {
    const handleClick = () => {
        console.log('select a project');
    }
    return (
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
    
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">This is the title</h5>
    
    <p className="mb-3 font-normal text-gray-700 ">this is the description</p>
    <p className='text-sm font-medium'>This is the price</p>
    <p className='text-sm font-medium'>This is the deadline</p>

   <Button onClick ={handleClick} text='select'/>
</div>

    );
};

export default Card;