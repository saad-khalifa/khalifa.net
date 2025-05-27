import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

export default function Lading(){
    return(
     <div className='d-flex align-items-center justify-content-between flex-wrap hand'>
      <Container>
      <div className='col-lg-5 col-md-8 col-12 text-md-start text-center'>
      <h1 className='display-2 fw-bold'>Products</h1>
      <h5 style={{ color:'#512229' }} className='fw-normal'>Welcome to our online store! Enjoy a seamless shopping experience with a wide variety of high-quality products. Discover amazing deals now!</h5>
      <Link to='/categories' className='btn btn-primary mt-3 py-3 px-4 fw-bold text-light'>
      shop now</Link>
      </div>
      </Container>
      </div>
    );
}