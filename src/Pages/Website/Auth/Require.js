import Cookie from 'cookie-universal';
import { Outlet, useNavigate } from 'react-router-dom';
import { Axios } from '../../../Api/Axios';
import Loading from '../../../Components/Loading/Loading';
import { useEffect, useState } from 'react';
import { USER } from '../../../Api/api';
import Err403 from '../../Page Error/Err403';
export default function Require({allowedRole}){

    const [user,setUser]=useState("");
        // cookie & token
const cookie=Cookie();
const token=cookie.get('commerce');
// Navigate
const Navigate=useNavigate();

    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then((data)=>setUser(data.data))
        .catch(()=>{
        Navigate('/login',{replace:true})
    })
    },[]);
   return(
    token ?
     (user ==='' ? (<Loading/>) :allowedRole.includes(user.role) ?(<Outlet/>) :
     <Err403 role={user.role}/>
     )
     
     :( <Navigate to={'/login'} replace={true}/>

     )
   )
}