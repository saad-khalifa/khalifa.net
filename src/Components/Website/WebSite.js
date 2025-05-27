import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function WebSite(){
    return(
        <>
        <NavBar/>
        <Outlet/>
        </>
    );
}