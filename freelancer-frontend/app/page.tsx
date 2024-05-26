"use client"
import Card from "@/components/Cards";
import {Appbar} from "../components/Appbar";
import { Project } from "@/components/SelectProject";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <main>
      <RecoilRoot>
      <Appbar />
      <Project />
      </RecoilRoot>
      
    </main>
  );
}
