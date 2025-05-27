import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { TopRatedApi } from "../../../Api/api";
import TopRated from "./TopRated";
import SkeletonShow from "../../Skelton/SkeletonShow";
import { Search } from "../../../Context/SearchContext";

export default function ShowTopRated(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        Axios.get(`${TopRatedApi}`)
        .then((data)=>setProducts(data.data))
        .finally(()=>setLoading(false))
    },[])

    const search=useContext(Search);
   const ser=search.searching;

    const filterPro=products.filter((item)=>item.title.toLowerCase().includes(ser.toLowerCase()));

    const productShow=filterPro.map((product)=>
        <TopRated
        title={product.title}
        description={product.description}
        img={product.images[0].image}
        sale
        price={product.price}
        discount={product.discount}
        rating={product.rating}
        id={product.id}
        />
    )
    return(
        <div className="col-md-6 col-12 w-100 " style={{ border:'2px solid #0D6EFD',marginTop:"15px" }}>
            <h1 className="text-center m-0 p-3 bg-primary text-white">TopRated</h1>
            <div className="p-5">  {loading ?(
                            <SkeletonShow length='1' height='800px' classes='col-12'/>
                        ):productShow}</div>
        </div>
    );
}