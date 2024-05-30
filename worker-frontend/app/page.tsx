"use client"
import Image from "next/image";
import {Appbar} from "../components/Appbar";
import { RecoilRoot } from "recoil";
import {NextBid} from "../components/NextBid";
import { Voting } from "@/components/Voting";

export default function Home() {
  return (
    
   <div>
    <RecoilRoot>
    <Appbar />
    <NextBid />
    <Voting />
   
    </RecoilRoot>
   </div>
  );
}
