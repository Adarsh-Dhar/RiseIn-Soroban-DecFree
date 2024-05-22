import React from 'react';

interface CardProps {
    title: string;
    content: string;
}

const Card = () => {
    return (
       

<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">this is the price</p>
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">this is the deadline</p>
    <p className="mb-3 font-normal text-gray-700">this is the rating</p>
   
</div>

    );
};

export default Card;