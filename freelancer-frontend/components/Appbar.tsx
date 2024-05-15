import React from 'react';

const Appbar: React.FC = () => {
    const handleConnectWallet = () => {
        // Add your logic for connecting the wallet here
    };

    return (
        <div>
            <input type="text" placeholder="Github" className="border border-gray-300 rounded-md p-2" />
            <button onClick={handleConnectWallet}>Connect Wallet</button>
        </div>
    );
};

export default Appbar;