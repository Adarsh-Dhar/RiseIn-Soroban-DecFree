"use client"
import React, { useEffect } from 'react';
import Button from './Button';
import { fetchPoll , fetchVoter} from './Soroban';
import { publicKeyAtom } from '@/store/atoms/Key';
import { useRecoilValue } from 'recoil';



const Decision = ({yes , no} : any) => {
    const publicKey = useRecoilValue(publicKeyAtom);
    useEffect(() => {
        if (publicKey != "Wallet not Connected..") {
            // @ts-ignore
          console.log(fetchPoll(publicKey));
        }
      }, [publicKey]);


      async function getVoter() {
        let voterinfo = await fetchVoter();
        let choicebuttons = document.getElementById("choicebuttons");
        let initButton = document.getElementById("initiate");
        // @ts-ignore
        initButton.remove();
        if (voterinfo[0] == "none") {
            // @ts-ignore
          for (let i = 0; i < choices.length; i++) {
            // @ts-ignore
            let choicedesc = choices[i]
            let _button = document.createElement("button");
            _button.value = choicedesc;
            // @ts-ignore
            _button.onclick = () => submitVote(choicedesc)
            _button.innerHTML = choicedesc;
            _button.className = "w-100 btn btn-md mb-3"
            _button.style.backgroundColor = '#ab20fd'
            _button.style.color = 'white'
            // @ts-ignore
            choicebuttons.appendChild(_button);
            // @ts-ignore
            choicebuttons.appendChild(document.createElement("br"));
          }
          return;
        }
        else {
          let title = document.createElement("h5");
          title.textContent = "Vote Already Submitted";
          title.style.color = 'white'
          let choice = document.createElement("h5");
          choice.textContent = "Voted: " + voterinfo[0];
          choice.style.color = 'white'
          // @ts-ignore
          choicebuttons.appendChild(title);
          // @ts-ignore
          choicebuttons.appendChild(choice);
          return;
        }
      }
    

    return (
       
        <div>
            <h1>Do you approve the repository?</h1>
            <div>Yes = {yes}</div>
            <div>No = {no}</div>

            
        </div>

    );
};

export default Decision;