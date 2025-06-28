import WasherCard from "../components/WasherCard";
import { useLiveWashers } from "../hooks/useLiveWashers";
import { Spinner } from "@heroui/spinner";
export default function Index() {
    const {washers, loading} = useLiveWashers();
    return (
            <div className="flex w-full h-auto gap-10 flex-wrap justify-center">
               {loading ? (
               <Spinner size="lg" variant="wave" />
               ) : (
               washers.map((washer) => (
                   <WasherCard
                   key={washer.id}
                   id={washer.id}
                   name={washer.name}
                   available={washer.available}
                   broken={washer.broken}
                   resting={washer.resting}
                   lastUsed={washer.lastUsed}
                   />
               ))
               )}
            </div>
    );
}