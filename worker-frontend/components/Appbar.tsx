import React from 'react';

const Appbar: React.FC = () => {
    const handleConnectWallet = () => {
        // Add your logic for connecting the wallet here
    };

    return (
        <div>
            <button onClick={handleConnectWallet}>Connect Wallet</button>
        </div>
    );
};

export default Appbar;