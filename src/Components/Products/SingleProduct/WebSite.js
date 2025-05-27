import { Outlet } from "react-router-dom";
import NavBar from "../../Website/NavBar";

export default function WebSite(){
    return(<>
    <NavBar/>
    <Outlet/>
    
    </>);
}