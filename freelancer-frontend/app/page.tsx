import Image from "next/image";
import Appbar from "../components/Appbar";
import SelectProject from "@/components/SelectProject";

export default function Home() {
  return (
    <div>
 <Appbar />
   <SelectProject />
    </div>
  
  );
}
