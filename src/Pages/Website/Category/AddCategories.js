import { Form } from "react-bootstrap";
import { Cat } from "../../../Api/api";
import { Axios } from "../../../Api/Axios";
import Loading from "../../../Components/Loading/Loading";
import { useState } from "react";

export default function AddCategories(){
    const [title,setTitle]=useState('');
    const [image,setImage]=useState('');
    const [loading,setLoading]=useState(false);
    // submit
    async function submit(e){
        setLoading(true);
        e.preventDefault();
        const form= new FormData();
        form.append('title',title);
        form.append('image',image);
        console.log(form)
        try{
            let res= await Axios.post(`${Cat}/add`,form)
            window.location.pathname='/dashboard/categories';
        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
        {loading && <Loading/>}
    <Form className="bg-white w-100 mx-2 p-2" onSubmit={submit}>

    <Form.Group className="mb-3">
         <Form.Label>Title</Form.Label>
         <Form.Control required  value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Name Category..."/>
     </Form.Group>

     <Form.Group className="mb-3">
         <Form.Label>Image</Form.Label>
         <Form.Control onChange={(e)=>setImage(e.target.files.item(0))} type="file" placeholder="Image..."/>
     </Form.Group>


    <button disabled={title.length >1 ? false : true} className="btn btn-primary mt-3 w-100">Save</button>
    </Form>
    </>
)}