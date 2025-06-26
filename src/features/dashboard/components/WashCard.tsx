
import { WashIcon } from "./Icons"
export default function WashCard() {
    return(
        <div className="flex flex-col rounded- h-auto w-auto items-center justify-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <WashIcon size={250}/>
        </div>
    )
}