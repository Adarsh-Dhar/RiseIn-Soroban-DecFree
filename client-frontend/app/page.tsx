import Image from "next/image";
import {Appbar} from "../components/Appbar";
import Project from "../components/Project";

export default function Home() {
  return (
    <main>
      <Appbar />
      <Project />
    </main>
  );
}
