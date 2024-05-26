"use client"
import Image from "next/image";
import {Appbar} from "../components/Appbar";
import Decision from "../components/Decision";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    
   <div>
    <RecoilRoot>
    <Appbar />
    <Decision />
    </RecoilRoot>
   </div>
  );
}
