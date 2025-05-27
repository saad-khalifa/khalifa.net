import { useContext, useEffect, useState } from 'react';
import './Bar.css';
import { Menu } from '../../Context/MenuContext';
import { Axios } from '../../Api/Axios';
import { LOGOUT, USER } from '../../Api/api';
import Cookie from 'cookie-universal';
import { DropdownButton, DropdownItem } from 'react-bootstrap';
export default function TopBar(){
    const [name,setName]=useState('');
    const menu=useContext(Menu);
    const setIsOpen=menu.setIsOpen;
    const cookie=Cookie();
        useEffect(()=>{
          Axios.get(`${USER}`)
          .then((date)=>setName(date.data.name))
        },[])
        async  function handelLogout(){
            try{
                await Axios.get(`/${LOGOUT}`);
                cookie.remove('commerce');
                window.location.pathname='/login';

            }catch(err){
                console.log(err);
            }
      }
    return(
        <div className='top-bar '>
            <div className='d-flex align-items-center gap-2'>
            <h3>saad Khalifa</h3>
            <i className='fas fa-bars icon' onClick={()=>setIsOpen((prev)=>!prev)}></i>
            </div>
            <div>
            <DropdownButton id="dropdown-basic-button" title={name}> 
                <DropdownItem onClick={handelLogout}>LogOut</DropdownItem>
                 </DropdownButton></div>
           
        </div>
    )
}