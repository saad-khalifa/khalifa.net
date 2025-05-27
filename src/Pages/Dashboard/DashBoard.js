import {Outlet} from 'react-router-dom';
import SideBar from '../../Components/DashBoard/SideBar';
import TopBar from '../../Components/DashBoard/TopBar';
import './dashBoard.css';
export default function DashBoard(){
    return(
        <div className='position-relative '>
            <TopBar/>
            <div className='dashBoard d-flex gap-1' style={{ marginTop:"70px" }}>
            <SideBar/>
            <Outlet/>
            </div>
        </div>
    );
}