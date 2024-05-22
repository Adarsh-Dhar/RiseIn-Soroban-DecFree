import React from 'react';

interface ButtonProps {
    text: string;
    onclick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onclick }) => {
    return <button onClick={onclick} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
      {text}
    </span>
  </button>;
};

export default Button;