import React from 'react';

const PostBid: React.FC = () => {
    return (
        <div>
            <h1>Are you a freelancer?</h1>
            <h2>Post a bid</h2>
            <input type="text" placeholder="your address" />
            <input type="text" placeholder="amount" />
            <input type="number" placeholder="timestamp" />
            <button>Post bid</button>
        </div>
    );
};

export default PostBid;