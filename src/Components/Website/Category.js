import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Axios } from "../../Api/Axios";
import { CAT } from "../../Api/api";
import StringSlice from "../../helpers/StringSlice";
import SkeletonShow from "../Skelton/SkeletonShow";
import { Link } from "react-router-dom";

export default function Category(){
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(true);
  // Get Category
  useEffect(()=>{
   const res= Axios.get(`/${CAT}`)
      .then((data)=>{
        setCategories(data.data);
  }).finally(()=>setLoading(false))
      .catch((err)=>{
        console.log(err)})
        },[]);

        const showCategory=categories.map((category,key)=>(
            <Link to={`/categories/${key+1}`}  className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
            <div  className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
                <img width='50px' className="ms-3" alt="" src={category.image}/>
            <p className='m-0' key={key}>{StringSlice(category.title,12)}
            </p></div>
            </Link>
        ))

    return(
        <>
        <div  className="bg-secondary py-5">
            <Container>
                <div  className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
                {loading ?(
                    <SkeletonShow length='8' height='70px' classes='col-lg-3 col-md-6 col-12'/>
                )
                :showCategory}
                </div>
            </Container>
        </div>
        </>
    )
}