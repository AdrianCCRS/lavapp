import WashCard from "../components/WashCard";
import { useLiveWashers } from "../hooks/useLiveWashers";
import { Spinner } from "@heroui/spinner";
import CNavbar from "@components/Navbar";
import { useAuth } from "@context/AuthContext";

interface IndexProps {
    className?: string;
}

export default function Index({ className }: IndexProps) {
    const {washers, loading} = useLiveWashers();
    const auth = useAuth();
    return (
        <>
        <CNavbar username={`${auth.customUser?.firstName || ""} ${auth.customUser?.secondName || ""} ${auth.customUser?.firstLastName || ""} ${auth.customUser?.secondLastName}`} />
        <div className={`flex flex-1 min-w-0 justify-center items-center min-h-screen w-full px-10 py-12 bg-background ${className || ""}`}>
            <div className="flex w-full h-auto gap-10 flex-wrap justify-center">
               {loading ? (
               <Spinner size="lg" variant="wave" />
               ) : (
               washers.map((washer) => (
                   <WashCard
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
        </div>
        </>
    );
}