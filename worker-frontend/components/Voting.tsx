import { fetchPoll , fetchVoter, vote} from "./Soroban"
import { yesAtom, noAtom, totalAtom } from "@/store/atoms/Votes";
import { publicKeyAtom } from "@/store/atoms/Key";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "./Button";
import { get } from "http";


export const Voting = () => { 
  const [connect, getConnected] = useState("Connect")
  const publicKey = useRecoilValue(publicKeyAtom)
  const yesCount = useRecoilValue(yesAtom)
  const setYesCount = useSetRecoilState(yesAtom)
  const noCount = useRecoilValue(noAtom)
  const setNoCount = useSetRecoilState(noAtom)
  const total = useRecoilValue(totalAtom)
  const setTotal = useSetRecoilState(totalAtom)
  const [voted, setVoted] = useState(false)
  const [pollVote, setPollVote] = useState("none")

    useEffect(() => {
        if(publicKey !== ""){
          getConnected("Connected")
              fetchPoll(publicKey).then((values) => {
                console.log(fetchVotes(values))
              })
              
        }
        
      },[publicKey])

      

      const getVoter = async () => {
        let voterInfo = await fetchVoter(publicKey)
        if(voterInfo[0] !== "none"){
            setVoted(true)
         } 
      }

      const submitVote = async () => {
        if(pollVote !== "none"){
            await vote(pollVote)
            console.log(vote(pollVote))
            await new Promise(r => setTimeout(r, 3000));
            console.log("voted")
        }else{
            console.log("no vote")
        }
      }

      const fetchVotes = async (values : Array<string>) => {
        setNoCount(parseInt(values[0]))
        setTotal(parseInt(values[1]))
        setYesCount(parseInt(values[2]))  
       }

       if(voted){
        return (
            <div>
                <h1>You have already voted</h1>
            </div>
        )
       } else {
        return (
            <div>
                <Button onClick={() => {
                    setPollVote("yes")
                    
                    setYesCount(yesCount + 1)
                    setTotal(total + 1)
                    new Promise(r => setTimeout(r, 3000));
                    submitVote()
                    console.log(pollVote)
                } } text="Yes" />
                <Button onClick={() => {
                    setPollVote("no")
                    setNoCount(noCount + 1)
                    setTotal(total + 1)
                    new Promise(r => setTimeout(r, 3000));
                    submitVote()
                    console.log(pollVote)

                
                }} text="No" />
            </div>
        )
       }

       

}

