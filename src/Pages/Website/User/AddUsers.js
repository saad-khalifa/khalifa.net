import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/api";
import Loading from "../../../Components/Loading/Loading";
export default function AddUsers(){
    // state
        const [name,setName]=useState('');
        const [email,setEmail]=useState('');
        const [password,setPassword]=useState('')
        const [role,setRole]=useState('');
         const [loading,setLoading]=useState(false);

         async function handelSubmit(e){
            e.preventDefault();
           try{
            await Axios.post(`${USER}/add`,{
                name:name,
                email:email,
                password:password,
                role:role
            } )
            setLoading(true)
            window.location.pathname='./dashboard/users';

           }catch(err){
            console.log(err)
           }
        }
    return(
         <>
             {loading && <Loading/>}
     <Form onSubmit={handelSubmit} className="bg-white w-100 mx-2 p-2">
     <Form.Group className="mb-3">
         <Form.Label>UserName</Form.Label>
         <Form.Control required  value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="UserName..."/>
     </Form.Group>
     <Form.Group className="mb-3">
         <Form.Label>Email</Form.Label>
         <Form.Control required  value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="Email..."/>
     </Form.Group>
     <Form.Group className="mb-3">
         <Form.Label>Password</Form.Label>
         <Form.Control required  value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder="password..."/>
     </Form.Group>
     <Form.Group className="mb-3">
         <Form.Label>Role</Form.Label>
         <Form.Select required  value={role} onChange={(e)=>setRole(e.target.value)}  type="text">
         <option disabled value={''}>Select Role</option>
             <option value='1995'>admin</option>
             <option value='2001'>user</option>
             <option value='1996'>writer</option>
             <option value='1999'>product Manger</option>
         </Form.Select>
     </Form.Group>
         <button className="btn btn-primary mt-4 w-100">Save</button>
     </Form>
     </>
    )
}