import { div } from "framer-motion/client";
import WashCard from "../components/WashCard";

export default function Index(){
    return(
        <div className="flex justify-center items-center h-screen w-screen p-12">
            <div className="flex w-auto h-auto">
                <WashCard/>
            </div>
        </div>
    )
}