import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CAT, Pro } from "../../../Api/api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import './Progress.css';

export default function EditProduct(){
    const [send,setSend]=useState(false);
    const [category,setCategory]=useState([]);
    const [images,setImages]=useState([]);
    const [imagesFromSever,setImagesFromServer]=useState([]);
    const [loading,setLoading]=useState(false);
    const {id}=useParams();
    const [idFromServer,setIdFromServer]=useState([]);    
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
// handel Form
    function handelForm(e){
        setForm({...form,[e.target.name]:e.target.value});
        setSend(true);

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

      useEffect(()=>{
       const res=Axios.get(`${Pro}/${id}`)
       .then((data)=>{
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
       })
      },[])
    //   categoryShow
    const categoryShow=category.map((item,key)=><option key={key} value={item.id}>{item.title}</option>
    )
    // handel submit edit data
    async function submit(e){
        setLoading(true);
        e.preventDefault();
        try{
                   for(let i=0; i< idFromServer.length ; i++){
            await Axios.delete(`product-img/${idFromServer[i]}`);
        }
            let res= await Axios.post(`${Pro}/edit/${id}`,form)
            nav('/dashboard/Products')
        }catch(err){
            console.log(err)
        }
    }
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
    async function handelDeleteImageFromServer(id){
        setImagesFromServer((prov)=>prov.filter((img)=> img.id !==id));
        setIdFromServer((prov)=>{
            return[...prov,id]
        })
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
    const imagesFromServerShow=imagesFromSever.map((img,key)=>(
        <div key={key} className=" border p-2 w-100 p-2 col-2 position-relative">
            <div className="d-flex align-items-center justify-content-start gap-2">
            <img alt="" src={img.image} width='80px'></img>
         </div>
         <div style={{ cursor:'pointer' }} className="position-absolute top-0 end-0 bg-danger rounded text-white">
            <p className="py-1 px-2 m-0" onClick={()=>handelDeleteImageFromServer(img.id)}>x</p>
         </div>
        </div>
     ))
//   Show Images
const imagesShow=images.map((img,key)=>(
   <div key={key} className=" border p-2 w-100">
     <div className="d-flex align-items-center justify-content-between">
       <div className="d-flex align-items-center justify-content-start gap-2">
       <img alt="" src={URL.createObjectURL(img)} width='80px'></img>
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
        <Form.Control name="title" required  value={form.title} onChange={handelForm} type="text" placeholder="Title..."/>
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
        <Form.Control name="discount" required  value={form.discount} onChange={handelForm} type="text" placeholder="discount..."/>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control name="stock" required  value={form.stock} onChange={handelForm} type="text" placeholder="stock..."/>
    </Form.Group>
    
    <Form.Group className="mb-3">
        <Form.Label>About</Form.Label>
        <Form.Control name="About" required  value={form.About} onChange={handelForm} type="text" placeholder="About..."/>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Images</Form.Label>
        <Form.Control hidden ref={open} type="file" multiple onChange={handelImages}/>
    </Form.Group>


        <div onClick={openImages} className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
        style={{border: '2px dashed #0086fe',cursor: send &&"pointer"}}
        >
            <img src={require('../../../img/R.png')} width='100px' alt="UpLoad images" />
            <p className="fw-bold mb-0" style={{color:"#0086fe"}}>UpLoad images</p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
        {imagesFromServerShow}
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
        {imagesShow}
        </div>
    <button disabled={form.title.length >1 ? false : true} className="btn btn-primary mt-3 w-100">Save</button>
    </Form>
    </>
)}
