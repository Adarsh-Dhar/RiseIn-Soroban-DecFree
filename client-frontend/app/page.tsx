"use client"
import { RecoilRoot } from "recoil";
import {Appbar} from "../components/Appbar";
import Project from "../components/Project";

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
