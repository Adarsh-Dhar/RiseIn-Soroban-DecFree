import React from 'react';
import Button from './Button';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { useRecoilValue } from 'recoil';
import { projectIdAtom } from '@/store/atoms/Project';

const Github: React.FC = () => {
    const [repo, setRepo] = React.useState<string>("")
    const submitRepos = async() => {
        const response = await axios.post(`${BACKEND_URL}/bid`,{
            data : {
                projectId : useRecoilValue(projectIdAtom),
                repo : repo
            }
        })

    }
    return (
        <div>
            <input type="text" placeholder="repo" value={repo} onChange={(e) => setRepo(e.target.value)}/>
            
            <Button text="Submit" onClick={submitRepos} />
        </div>
    );
};

export default Github;