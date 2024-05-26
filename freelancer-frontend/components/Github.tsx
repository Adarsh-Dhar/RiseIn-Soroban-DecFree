import React from 'react';
import Button from './Button';
import axios from 'axios';

const Github: React.FC = () => {
    const submitRepos = async() => {
        const response = await axios.post()

    }
    return (
        <div>
            <input type="text" placeholder="repo1" />
            <input type="text" placeholder="repo2" />
            <input type="text" placeholder="repo3" />
            <Button text="Submit" onClick={submitRepos} />
        </div>
    );
};

export default Github;