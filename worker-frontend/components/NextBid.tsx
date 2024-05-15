import React, { use, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/config';

interface Bid {
    id : number;
    title : string;
    description : string;
    price : number;
    deadline : number;
    assigned : boolean;
    done : boolean;
    clientId : number;
}

const NextBid = () => {
    const [currentBid, setCurrentBid] = React.useState<Bid|null>(null);
    const [loading , setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/v1/worker/bid`)
        .then(res => {
            setCurrentBid(res.data.bid);
            setLoading(false);
        
        })
    },[])
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!currentBid) {
        return <div>No more bid for you to review</div>;
    }

    const submitBid = async () => {
        await axios.post(`${BACKEND_URL}/v1/worker/submission`, {
            bidId: currentBid.id,
            
        });
    };

    return (
        <div>
            <div>{currentBid.title}</div>
            <div>{currentBid.deadline}</div>
            <div>
                <button onClick={submitBid}>Submit Bid</button>
            </div>
        </div>
    );
    }
    


export default NextBid;