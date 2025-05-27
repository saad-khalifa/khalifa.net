import {Route, Routes} from 'react-router-dom';
import './all.min.css';
import './Components/Loading/Loading.css';
import './Media/media.css';
import './Components/css/error.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Website/Auth/Login';
import Register from './Pages/Website/Auth/Register';
import HomePage from './Pages/Website/HomePage';
import DashBoard from './Pages/Dashboard/DashBoard';
import './Pages/Website/User/User';
import User from './Pages/Website/User/User';
import Require from './Pages/Website/Auth/Require';
import EditUser from './Pages/Website/User/EditUser';
import AddUsers from './Pages/Website/User/AddUsers';
import Err404 from './Pages/Page Error/Err404';
import RequireBack from './Pages/Website/Auth/RequireBack';
import Categories from './Pages/Website/Category/Categories';
import AddCategories from './Pages/Website/Category/AddCategories';
import EditCategories from './Pages/Website/Category/EditCategories';
import Products from './Pages/Website/Products/Products';
import AddProducts from './Pages/Website/Products/AddProducts';
import EditProduct from './Pages/Website/Products/EditProduct';
import Category from './Components/Website/Category';
import WebSite from './Components/Website/WebSite';
import SingleProduct from './Components/Products/SingleProduct/SingleProduct';
import SingleCategory from './Components/Products/SingleProduct/SingleCategory';
import AboutUs from './Pages/Website/Auth/AboutUs';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WebSite/>}>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/categories' element={<Category/>}/>
        <Route path='/categories/:id' element={<SingleCategory/>}/>
        <Route path='/product/:id' element={<SingleProduct/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        </Route>
        <Route element={<RequireBack/>}>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        </Route>
        <Route path='/*' element={<Err404/>}/>
        {/* priv Router */}
        <Route element={<Require allowedRole={['1995' , '1996','1999']}/>}>
        <Route path='/dashboard' element={<DashBoard/>}>

        <Route element={<Require allowedRole={["1999","1995"]}/>}>
        <Route path='addUser' element={<AddUsers/>}/>
        <Route path='users' element={<User/>}/>
        <Route path='users/:id' element={<EditUser/>}/>
        </Route>

        <Route element={<Require allowedRole={['1995','1999']}/>}>
        <Route path='categories' element={<Categories/>}/>
        <Route path='categories/:id' element={<EditCategories/>}/>
        <Route path='addCategories' element={<AddCategories/>}/>
         {/* products  */}
        <Route path='products' element={<Products/>}/>
        <Route path='products/:id' element={<EditProduct/>}/>
        <Route path='addProducts' element={<AddProducts/>}/>
        </Route>

        </Route>
        </Route>
        
      </Routes>
    </div>

  );
}

export default App;
