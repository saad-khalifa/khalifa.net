import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CART, Pro } from "../../../Api/api";
import SkeletonShow from "../../Skelton/SkeletonShow";
import { Cart } from "../../../Context/CartContext";
import Cookie from 'cookie-universal';
import PlusMinusBtn from "../../Website/PlusMinusBtn";

export default function SingleProduct(){

    const {id}=useParams();
    const [product,setProducts]=useState([]);
    const [productImages,setProductImages]=useState([]);
    const [loading,setLoading]=useState(true);
    const {setIsChange}=useContext(Cart);
    const [count,setCount]=useState(5);
    const [loadingCart,setLoadingCart]=useState(false);
    const [error,setError]=useState(false);
    const cookie=Cookie();
    const token=cookie.get('commerce');

    const roundStars=Math.round(product.rating);
    const stars=Math.min(roundStars,5);

    const showGoldStars=Array.from({length:stars}).map((_,key)=>
            <i key={key} style={{ color:'yellow' }} className='fas fa-star'></i>
    )
        const showEmptyStars=Array.from({length:5-stars}).map((_,key)=>
              <i key={key} className='far fa-star'></i>
    )

    useEffect(()=>{
        Axios.get(`${Pro}/${id}`)
        .then((data)=>{
        setProductImages(data.data[0].images.map((img)=>
        {return {original:img.image,thumbnail: img.image}}));
        setProducts(data.data[0])
    })
    .finally(()=>setLoading(false))
        },[])

        const checkStock=async ()=>{
            try{
                setLoadingCart(true);
            const getItems=JSON.parse(localStorage.getItem("product")) || [];
            const productCount=getItems.filter((item)=>item.id ==id)?.[0]?.count;
              await  Axios.post(`${CART}/check`,{
                    product_id:product.id,
                    count:count+(productCount ? productCount:0),
                });
                return true ;
            }catch(err){
                console.log(err);
                return false ;
            }finally{
                setLoadingCart(false)
            }
        }

        const handelSave= async ()=>{
          if(token){
            const check= await checkStock();
          if(check){
            const getItems=JSON.parse(localStorage.getItem("product")) || [];
            const productExist=getItems.findIndex((pro)=>pro.id==id);
            if(productExist !== -1){
                if(getItems[productExist].count){
                    getItems[productExist].count+=count;
                }else{
                    getItems[productExist].count=count;
                }
            }else{
                if(count >1){
                    product.count=count;
                }
            getItems.push(product);
            }
            localStorage.setItem("product",JSON.stringify(getItems))
            setIsChange((prev)=> !prev)
        }
          }else{
            setError(true)
          }
    }
        
    return(
    <Container className="mt-5">
    <div className="d-flex align-items-start justify-content-between flex-wrap">
        {loading ? <>
        <div className="col-lg-4 col-md-6 col-12">
        <SkeletonShow
        height='250px'
        length='1'
        classes='col-12'
        />
        <div className="col-12 d-flex mt-1">
         <SkeletonShow
        height='85px'
        length='1'
        classes='col-4'
        />
        <SkeletonShow
        height='85px'
        length='1'
        classes='col-4'
        />
        <SkeletonShow
        height='85px'
        length='1'
        classes='col-4'
        />
        </div>
        </div>

        <div className="col-lg-8 col-md-6 col-12">
            <SkeletonShow
        height='8px'
        length='1'
        classes='col-8'
        />
        <SkeletonShow
        height='150px'
        length='1'
        classes='col-8'
        />
        <SkeletonShow
        height='5px'
        length='1'
        classes='col-8'
        />
        <div className="d-flex justify-content-between col-lg-8 col-12">
            <SkeletonShow
        height='25px'
        width=''
        length='1'
        classes='col-4'
        /><SkeletonShow
        height='25px'
        length='1'
        classes='col-4'
        />
        </div>
        </div>
        </>
        :(
        <>
        <div className="col-lg-8 col-md-6 col-12">
    <ImageGallery items={productImages} />
        </div>
 <div className="col-lg-4 col-md-6 col-12">
   <h1>{product.title}</h1> 
    <h6 style={{ color:'gray' }}>{product.description}</h6>
    <h5>{product.About}</h5>
    <div className='d-flex align-items-center justify-content-between pt-4 border-top flex-wrap'>
    <div>
        {product.stock===1 &&(
            <p className='text-danger'>There is only 1 left</p>
        )}
         {showGoldStars}
         {showEmptyStars}

        <div className='d-flex align-items-center gap-3'>
        <h5 className='m-0 text-primary'>{product.discount}$</h5>
        <h6 className='m-0' style={{ color:'gray',textDecoration:'line-through' }}>{product.price}$</h6>
    </div>
    </div>

    <div className="d-flex align-items-center gap-4">
        <PlusMinusBtn setCount={(data)=>setCount(data)}/>

    <div  onClick={handelSave} className='border p-2 rounded'>
        {loadingCart ? ("Loading"):(
    <i width='20px' style={{ cursor:'pointer' }} className='fas fa-shopping-cart'></i>
        )}
    </div>
    </div>
 </div>
         {error &&<p className="border text-center bg-blue" style={{ color:'red',marginTop:'30px',marginLeft:'100px' }}>please first sign up</p>}

</div>

 </>
)
}
    </div>
    </Container>)
}