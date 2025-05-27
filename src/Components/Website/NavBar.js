import { Link } from 'react-router-dom';
import {Button, DropdownButton, DropdownItem, Form, Modal} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import { Axios } from '../../Api/Axios';
import { CAT, LOGOUT, USER } from '../../Api/api';
import StringSlice from '../../helpers/StringSlice';
import SkeletonShow from '../Skelton/SkeletonShow';
import Cookie from 'cookie-universal';
import { Cart } from '../../Context/CartContext';
import PlusMinusBtn from './PlusMinusBtn';
import { Search } from '../../Context/SearchContext';
export default function NavBar(){
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(true);
  const [products,setProducts]=useState([]);
  const [count,setCount]=useState();
  const {isChange}=useContext(Cart);
  const cookie=Cookie();
  const token=cookie.get('commerce')

    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   const [name,setName]=useState('');


 const changeSearch=useContext(Search);
 const setSearch=changeSearch.setSearching;
 function handelSearch(e){
  setSearch(e.target.value);
 }
 useEffect(()=>{
  if(token){

           Axios.get(`${USER}`)
           .then((date)=>setName(date.data.name))
         }},[])
        
 async  function handelLogout(){
             try{
                 await Axios.get(`/${LOGOUT}`);
                 cookie.remove('commerce');
                 window.location.pathname='/';
 
             }catch(err){
                 console.log(err);
             }
       }
  // Get Category
  useEffect(()=>{
   const res= Axios.get(`/${CAT}`)
      .then((data)=>{
        setCategories(data.data.slice(-7));
  }).finally(()=>setLoading(false))
      .catch((err)=>{
        console.log(err)})
        },[]);
        const showCategory=categories.map((category,key)=>(
            <Link to={`/categories/${category.id}`} className='btn btn-primary m-0' key={key}>
                {StringSlice(category.title,15)}
                </Link>
        ))

        useEffect(()=>{
            const getItems=JSON.parse(localStorage.getItem("product")) || [];
            setProducts(getItems)
        },[isChange])

        const handelDelete=(id)=>{
         const filterProduct= products.filter((product)=>product.id !==id);
         setProducts(filterProduct);
         localStorage.setItem("product",JSON.stringify(filterProduct))
        };

        const changeCount=(id,btnCount)=>{
       const getItems=JSON.parse(localStorage.getItem("product")) || [];
        const findProduct =getItems.find((product)=>product.id==id);
        findProduct.count=btnCount;
        localStorage.setItem("product",JSON.stringify(getItems));
        }
        const productShow=products.map((product,key)=>(
        <div key={key} className='mb-4'>

          <div onClick={()=>handelDelete(product.id)}
           className='position-absolute  end-0 rounded-circle
          d-flex align-items-center justify-content-center bg-danger text-white'
          style={{ width:'20px',height:'20px',cursor:'pointer' }}>
            <i className='fa fa-close'></i>
          </div>

            <div className='d-flex align-items-start gap-2 flex-wrap'>
            <img src={product.images[0].image} height='80px' style={{ objectFit:'cover' }}
            className='rounded col-sm-3 col-12' alt='img'
            />
            <div className='col-sm-6 col-12'>
            <h6>{product.title}</h6>
            <p className='m-0 text-truncate'>{product.description}</p>
            <div className='d-flex align-items-center gap-3'>
            <h5 className='m-0 text-primary'>{product.discount}$</h5>
            <h6 className='m-0' style={{ color:'gray',textDecoration:'line-through' }}>{product.price}</h6>
            </div>
            </div>
          <PlusMinusBtn id={product.id} changeCount={changeCount} count={product.count || 1}  setCount={setCount}/>
            </div>
        </div>
        )
    )




    return(
        <>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='w-100'>
          <div className='d-flex align-items-center justify-content-between'>
            <span>Cart Product</span>
            <i className='fas fa-shopping-cart' style={{ marginRight:'50px',color:'#808080' }}></i>
          </div>
</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <nav className="py-3">
            <Container>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <Link className='col-3' to='/'>
                    <img width='200px' alt='logo' src={require('../../IconImg/photo_2025-05-25_11-15-09.jpg')}/>
                    </Link>
                    <div className='col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative'>
                        <Form.Control onChange={handelSearch} type='search' 
                        className='form-control custom-search py-3 rounded-0'
                        placeholder='search product'
                        />
                        <h3 className='btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center'>
                            search
                        </h3>
                    </div>
                    <div className='col-3 d-flex align-items-center justify-content-end gap-5 order-md-3 order-1'>
                    <div style={{ cursor:'pointer' }} onClick={handleShow}>
                    <img width='50px' src={require('../../IconImg/OIP.jpg')} alt='cart'/>
                    </div>
                    {token ?(
                      <div>
            <DropdownButton id="dropdown-basic-button " title={name} 
                     > 
                <DropdownItem onClick={handelLogout}>LogOut</DropdownItem>
                 </DropdownButton></div>
                    ):(
                      <Link to='/login'>
                    <img width='40px' title='Sign up' alt='cart'
                    src={require('../../IconImg/profile.png')}
                    />
                    </Link>
                    )}
                    </div>
                </div>
                <div className='mt-3'>
                    <div className='d-flex align-items-center justify-content-start gap-3 flex-wrap'>
                    {loading ?
                    <SkeletonShow length='3' height='30px' width='80px' classes='col-2'/>
                    :showCategory}
                    <div className='d-flex align-items-center category-title gap-2'>
                    <Link className=' btn btn-primary' to='/categories'>
                      show all
                    </Link>
                    <Link className=' btn btn-primary' to='/about'>
                      About us
                    </Link>
                    </div>
                    </div>
                </div>
            </Container>
        </nav>
        </>
    );
}