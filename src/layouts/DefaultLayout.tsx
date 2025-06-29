import Navbar from "@components/Navbar";
import { useAuth } from "@context/AuthContext";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    const auth = useAuth();

    return (
        <>
        <Navbar username={`${auth.customUser?.firstName || ""} ${auth.customUser?.secondName || ""} ${auth.customUser?.firstLastName || ""} ${auth.customUser?.secondLastName}`} />
        <main className={`flex flex-1 min-w-0 justify-center items-center min-h-screen w-screen xl:w-full px-10 py-12 bg-background}`}>
            <Outlet/>
        </main>
        </>
    );
}