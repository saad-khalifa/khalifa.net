 import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/api";
import Loading from '../../../Components/Loading/Loading';
// import Err404 from "../../Page Error/Err404";

export default function EditUser(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [role,setRole]=useState("");
    const [disable,setDisable]=useState(true);
    const [loading,setLoading]=useState(true);
    //   id
        const {id} =useParams();
    async function handelSubmit(e){
        setLoading(true);
        e.preventDefault();
        try{
            let res= await Axios.post(`${USER}/edit/${id}`,{name:name,email:email,role:role});
            window.location.pathname='./dashboard/users';
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        Axios.get(`/${USER}/${id}`)
        .then((data)=>{
            setName(data.data.name);
            setEmail(data.data.email);
            setRole(data.data.role);
        })
        .then(()=>setDisable(false))
        .then(()=>setLoading(false))
        .catch(()=>{
            setLoading(false);
            window.location.pathname='/dashboard/users404'
        
        })
    },[])

    return(
        <>
    {loading && <Loading/>}
    <Form onSubmit={handelSubmit} className="bg-white w-100 mx-2 p-2">
    <Form.Group className="mb-3">
        <Form.Label>UserName</Form.Label>
        <Form.Control value={name} onChange={(e)=>setName(e.target.value)} 
        type="text" placeholder="UserName..."/>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control  value={email} onChange={(e)=>setEmail(e.target.value)}  
        type="email" placeholder="Email..."/>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select  value={role} onChange={(e)=>setRole(e.target.value)}
        type="text">
        <option disabled value={''}>Select Role</option>
            <option value='1995'>admin</option>
            <option value='2001'>user</option>
            <option value='1996'>writer</option>
        </Form.Select>
    </Form.Group>
        <button disabled={disable} className="btn btn-primary mt-4 w-100">Save</button>
    </Form>
    </>
)}