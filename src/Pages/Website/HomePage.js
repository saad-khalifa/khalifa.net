import './User/Home.css'
import Lading from '../../Components/Website/Landing/Lading';
import LatestSaleProduct from '../../Components/Products/LatestSale/LatestSaleProduct';
import ShowTopRated from '../../Components/Products/TopRated/ShowTopRated';
import Container from 'react-bootstrap/esm/Container';
import LatestShowProduct from '../../Components/Products/LatestSale/ImageHome';
import ContactUs from './Auth/ContactUs';
import Work from './Auth/Work';
import ScrollToTop from 'react-scroll-to-top';
export default function HomePage() {
    return (
      <div> 
        <ScrollToTop className='bg-warning'></ScrollToTop>
        <Lading/>
        <LatestSaleProduct/>
        <Container>
          <div className=' flex-wrap mt-5'>
        <ShowTopRated/>
        <LatestShowProduct/>
        </div>
        <div style={{ marginTop:'20px' }}>
          <Work/>
          <div style={{ marginTop:'20px' }}>
        <ContactUs/>

          </div>
        </div>
        </Container>
      </div>

    );
  }
  
  