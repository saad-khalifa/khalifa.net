import { useNavigate, useParams } from "react-router-dom";
import { Cat } from "../../../Api/api";
import Loading from "../../../Components/Loading/Loading";
import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Form } from "react-bootstrap";
export default function EditCategories(){
    const [title,setTitle]=useState();
    const [image,setImage]=useState();
    const [disable,setDisable]=useState(true);
    const [loading,setLoading]=useState(false);
    const Nav=useNavigate();
    // id
    const {id} =useParams()
    // useRef
    const focus=useRef(null);
    useEffect(()=>{
        focus.current.focus();
    })
// Navigate
const Navigate=useNavigate();

    useEffect(()=>{
        setLoading(true);
        Axios.get(`${Cat}/${id}`)
        .then((data)=>{
            setTitle(data.data.title);
            setLoading(false);
        }).then(()=>{
            setDisable(false);
        })
        .catch(()=> Nav('/dashboard/categories/page/404',{replace:true}))
    },[])
    // submit
    async function submit(e){
        setLoading(true);
        e.preventDefault();
        const form=new FormData();
        form.append('title',title);
        form.append('image',image);
        try{
            let res= await Axios.post(`${Cat}/edit/${id}`,form)
            Navigate('/dashboard/categories')
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
        <Form.Control ref={focus} value={title} onChange={(e)=> setTitle(e.target.value)} type="text" placeholder="title..."/>
    </Form.Group>

      <Form.Group className="mb-3" controlId="Image">
    <Form.Label>Image</Form.Label>
        <Form.Control onChange={(e)=> setImage(e.target.files.item(0))} type="file"/>
    </Form.Group>

    <button disabled={disable} className="btn btn-primary mt-3 w-100">Save</button>
    </Form>
    </>
)}