import { NavLink, useNavigate } from 'react-router-dom';
import './Bar.css';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../Context/MenuContext';
import { WindowSize } from '../../Context/WindowContext';
import { USER } from '../../Api/api';
import { Axios } from '../../Api/Axios';
import { Linked } from './LinkMap';
export default function SideBar(){
    const menu=useContext(Menu)
    const isOpen=menu.isOpen;
    const windowSizes=useContext(WindowSize);
    const window=windowSizes.windowSize;
     const [user,setUser]=useState("");
    const Navigate=useNavigate();

        useEffect(()=>{
            Axios.get(`/${USER}`)
            .then((data)=>setUser(data.data))
            .catch(()=>{
            Navigate('/login',{replace:true})
        })
        },[]);

    return(
        <>
        <div style={{ 
            position:'fixed',
            top:'70px',
            left:'0',
            width:'100%',
            height:'100vh',
            backgroundColor:'rgba(0,0,0,0.2)',
            display:window < '768' && isOpen ? 'block' :'none'
         }}>

        </div>
        <div className='side-bar pt-3'
        style={{ 
            left: window < "720" ? (isOpen ? 0 : '-100%') : 0,
            width :isOpen ? '240px' : 'fit-content',
            position: window < '768' ? 'fixed' : 'sticky' 
        }}
        >
            {Linked.map((links,key)=>(
                <span key={key}>
                {links.role.includes(user.role) &&
            <NavLink  to={links.path} className='d-flex align-items-center gap-2 side-bar-link'>
            <i className={links.icon}></i>
            <p className='m-0'
            style={{ display: isOpen ? 'block' : 'none' }}>{links.name}</p>
            </NavLink>
            }
            </span>

            ))}
            <div className='d-flex align-items-end justify-content-center'
             style={{ backgroundColor:'red',borderRadius:'20px',margin:'5px',marginTop:'100%' }}>
            </div>
            
            

            
        </div>
        </>
    );
}