import Card from "@/components/Cards";
import {Appbar} from "../components/Appbar";
import Bid from "../components/Bids";
import { Project } from "@/components/SelectProject";

export default function Home() {
  return (
    <main>
      <Appbar />
      <Project />
    </main>
  );
}
