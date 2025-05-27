import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CAT } from "../../../Api/api";

export default function SingleCategory(){
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(true);
  const {id}=useParams();
  const s=categories.filter((item)=>item.id==id);
  // Get Category
  useEffect(()=>{
   const res= Axios.get(`/${CAT}`)
      .then((data)=>{
        setCategories(data.data);
  }).finally(()=>setLoading(false))
      .catch((err)=>{
        console.log(err)})
        },[]);

        const showCategory=s.map((category,key)=>(
            <div key={key} className=" col-md-6 col-12 bg- border-0">
                <h1 className="text-center text-white">{"Name Category : "+category.title}</h1>
            <div className="m-1 bg-white border d-flex align-items-center justify-content-center gap-3 rounded py-2 flex-wrap">
                <img width='95%' className="ms-3" alt="" src={category.image}/>
            </div>
            </div>
        ))

    return(
        <>
        <div className="bg-secondary py-5">
            <Container>
                <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
                {loading ?(
                    <Skeleton length='8' height='70px' classes='col-lg-3 col-md-6 col-12'/>
                )
                :showCategory}
                </div>
            </Container>
        </div>
        </>
    )
}