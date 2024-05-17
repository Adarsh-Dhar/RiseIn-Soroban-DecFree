import React from 'react';

const Appbar: React.FC = () => {
    

    return (
        <div>
            <input type="text" placeholder="Github" className="border border-gray-300 rounded-md p-2" />
            <button>Connect Wallet</button>
        </div>
    );
};

export default Appbar;