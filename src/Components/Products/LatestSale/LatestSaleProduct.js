import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { LatestSale} from "../../../Api/api";
import SkeletonShow from "../../Skelton/SkeletonShow";
import Container from "react-bootstrap/esm/Container";
import SaleProduct from "../SaleProduct";
import { Search } from "../../../Context/SearchContext";
export default function LatestSaleProduct(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [limit,setLimit]=useState(-8);    
    const search=useContext(Search);
   const ser=search.searching;

    const filterPro=products.filter((item)=>item.title.toLowerCase().includes(ser.toLowerCase()));

    useEffect(()=>{
        Axios.get(`${LatestSale}`)
        .then((data)=>setProducts(data.data.slice(limit))).finally(()=>setLoading(false))
    },[limit])
    const showProducts=filterPro.map((product,key)=>
    <SaleProduct key={key} title={product.title} 
    description={product.description} 
    img={product.images[0].image} 
    sale price={product.price} 
    discount={product.discount} 
    rating={product.rating}
    id={product.id}
    col='3'
    />
    )

    function handelLimit(){
        setLimit(limit-8);
    }
    return(
        <Container>
            <div>
        <div className='d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2'>
            {loading ?(
                <SkeletonShow length='8' height='300px' classes='col-lg-3 col-md-6 col-12'/>
            ): showProducts
            }
        </div>
        <div onClick={handelLimit} className="d-flex align-items-center justify-content-center mt-5 ">
            <span className="d-flex align-items-center justify-content-between btn btn-primary" style={{ width:'200px' }}>
                <i className="fas fa-angle-down	"></i>
                <i>عرض المزيد</i>
            </span>
        </div>
        </div>
        </Container>
    );
}