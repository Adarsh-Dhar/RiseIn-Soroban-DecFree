import React from 'react';
import Button from './Button';

interface CardProps {
    title: string;
    content: string;
}

const Card = () => {
    const handleClick = () => {
        console.log('review');
    }
    return (
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">skills required</h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">repo 1</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">repo 2</p>

    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">repo 3</p>
    <Button text='review' onClick={handleClick}/>
   
</div>

    );
};

export default Card;