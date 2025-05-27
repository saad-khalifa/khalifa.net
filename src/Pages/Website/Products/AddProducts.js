import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CAT, Pro } from "../../../Api/api";
import Loading from "../../../Components/Loading/Loading";
import {useNavigate } from "react-router-dom";
import './Progress.css';

export default function AddProduct(){
    const [send,setSend]=useState(false);
    const [category,setCategory]=useState([]);
    const [id ,setId]=useState();
    const [images,setImages]=useState([])
    const [loading,setLoading]=useState(false);    
        // ref
        const focus=useRef();
        const open=useRef(null);
        const progress=useRef([])
        const j=useRef(-1);
        const ids=useRef([]);
        // handelFocus
    //   useNavigate
    const nav=useNavigate();

    const [form,setForm]=useState({
        category:"Select Category",
        title:"",
        description:"",
        price:"",
        discount:"",
        About:"",
        stock:""
    });

    const mydata={
        category:null,
        title:'sad',
        description:'mar',
        price:"200",
        discount:'0',
        About:"About",
        stock:0,
    }
//  handelSubmitForm
    async function handelSubmitForm() {
        try{
            const res= await Axios.post(`${Pro}/add`,mydata)
            .then((data)=>setId(data.data.id))
        }catch(err){
            console.log(err)
        }

    }
        // handel submit edit data
        async function submit(e){
            setLoading(true);
            e.preventDefault();
            try{
                let res= await Axios.post(`${Pro}/edit/${id}`,form)
                nav('/dashboard/Products')
            }catch(err){
                console.log(err)
            }
        }
// handel Form
    function handelForm(e){
        setForm({...form,[e.target.name]:e.target.value});
        setSend(true);
        if(send !==1){
            handelSubmitForm()
        }

    }
    function openImages(){
        open.current.click();
      }

      useEffect(()=>{
        focus.current.focus();
      },[]);


      //Get all categories
      useEffect(()=>{
      Axios.get(`/${CAT}`)
      .then((data)=>setCategory(data.data))
      .catch((err)=>console.log(err))
      },[]);
    //   categoryShow
    const categoryShow=category.map((item,key)=><option key={key} value={item.id}>{item.title}</option>
    )
    // handelDelete
   async function handelDelete(id,img){
    const findId=ids.current[id];
    try{
        const res= await Axios.delete(`product-img/${findId}`);
        setImages((prev)=>prev.filter((image) => image !== img))
        ids.current=ids.current.filter((i)=> i !== findId);
        j.current--
        
    }catch(err){
        console.log(err)
    }
    }
    // handel Images
    async function handelImages(e){
     setImages((prov)=>[...prov,...e.target.files]);
     const imagesFiles=e.target.files;
     const data=new FormData();
     for(let i=0; i<imagesFiles.length; i++){
        j.current++;
        data.append('image',imagesFiles[i]);
        data.append('product_id',id)
        try{
            const res=await Axios.post(`/product-img/add`,data,{
                onUploadProgress:(progressEvent)=>{
                    const {loaded,total}=progressEvent;
                    const percent=Math.floor((loaded*100)/total);
                    if(percent %5===0 ){
                        progress.current[j.current].style.width = `${percent}%`
                    progress.current[j.current].setAttribute("percent",`${percent}%`)
                }}
            });
            ids.current[j.current]=res.data.id;
        }catch(err){
            console.log(err)
        }
     }
    }
//   Show Images
const imagesShow=images.map((img,key)=>(
   <div key={key} className=" border p-2 w-100">
     <div className="d-flex align-items-center justify-content-between">
       <div className="d-flex align-items-center justify-content-start gap-2">
       <img src={URL.createObjectURL(img)} width='80px'></img>
        <div>
            <p className="mb-1">{img.name}</p>
            <p>{(img.size/1024)<1000 ?
             (img.size/1024).toFixed(2)+"KB" :
              (img.size/(1024*1024)).toFixed(2)+"MB"}</p>
        </div>
       </div>
        <button onClick={()=>handelDelete(key,img)} className="btn btn-primary">Delete</button>
    </div>
    <div className="custom-progress mt-3">
        <span
        ref={(e)=>(progress.current[key] = e)}
        //  percent={`${progress[key]}%`}
        //   style={{width:`${progress[key]}%`}}
           className="inner-progress">
           </span>
    </div>
   </div>
))


    return (
        <>
        {loading && <Loading/>}
    <Form className="bg-white w-100 mx-2 p-2" onSubmit={submit}>

    <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select ref={focus} name="category"  value={form.category} onChange={handelForm} placeholder="Title...">
            <option disabled>Select Category</option>
            {categoryShow}
        </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" required disabled={!send} value={form.title} onChange={handelForm} type="text" placeholder="Title..."/>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" required disabled={!send} value={form.description} onChange={handelForm} type="text" placeholder="description..."/>
    </Form.Group>
    
    <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control name="price" required disabled={!send} value={form.price} onChange={handelForm} type="text" placeholder="price..."/>
    </Form.Group>
    
    <Form.Group className="mb-3">
        <Form.Label>Discount</Form.Label>
        <Form.Control name="discount" required disabled={!send} value={form.discount} onChange={handelForm} type="text" placeholder="discount..."/>
    </Form.Group>
    
    <Form.Group className="mb-3">
        <Form.Label>About</Form.Label>
        <Form.Control name="About" required disabled={!send} value={form.About} onChange={handelForm} type="text" placeholder="About..."/>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control name="stock" required disabled={!send} value={form.stock} onChange={handelForm} type="number" placeholder="stock..."/>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Images</Form.Label>
        <Form.Control hidden ref={open} disabled={!send} type="file" multiple onChange={handelImages}/>
    </Form.Group>


        <div onClick={openImages} className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
        style={{border: !send ? "2px dashed gray" : '2px dashed #0086fe',cursor: send &&"pointer"}}
        >
            <img src={require('../../../img/R.png')} width='100px' style={{filter: !send && 'grayscale(1)'}} alt="UpLoad images" />
            <p className="fw-bold mb-0" style={{color: !send ? 'gray' :"#0086fe"}}>UpLoad images</p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
        {imagesShow}
        </div>
    <button disabled={form.title.length >1 ? false : true} className="btn btn-primary mt-3 w-100">Save</button>
    </Form>
    </>
)}
