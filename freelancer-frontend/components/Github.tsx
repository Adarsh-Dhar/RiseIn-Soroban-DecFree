import React from 'react';
import Button from './Button';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { useRecoilValue } from 'recoil';
import { projectIdAtom } from '@/store/atoms/Project';
import { tokenAtom } from '@/store/atoms/Tokens';

const Github: React.FC = () => {
    const token = useRecoilValue(tokenAtom)
    // @ts-ignore
    const tokenData = token.token
    const [repo, setRepo] = React.useState<string>("")
    const submitRepos = async() => {
        const response = await axios.post(`${BACKEND_URL}/bid`,{
            
                projectId : useRecoilValue(projectIdAtom),
                repo : repo
            
        },{
            headers : {
                Authorization : tokenData
            }   
        })
        console.log(response.data)

    }
    return (
        <div>
            <input type="text" placeholder="repo" value={repo} onChange={(e) => setRepo(e.target.value)}/>
            
            <Button text="Submit" onClick={submitRepos} />
        </div>
    );
};

export default Github;