import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {baseURL, REGISTER } from '../../../Api/api';
import Loading from '../../../Components/Loading/Loading';
import Cookie from 'cookie-universal';
import { Container } from 'react-bootstrap';
export default function Register() {
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  // cookie
  const cookie=Cookie();
  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try{
     const res = await axios.post(`${baseURL}/${REGISTER}`,form);
      setLoading(false);
      const token=res.data.token;
      cookie.set('commerce',token);
      const role=res.data.user.role;
      const go= role=== '1995' ? 'dashboard/users' : role==='1996' ? 'dashboard/writer' :'/';
      window.location.pathname=`${go}`
  }
    catch (err){
      if(err.response.status===422){
        setLoading(false)
        setErr("Email is already been token");
      }else{
        setLoading(false)
        setErr("internal server error")
      }
    }
}
  function handelForm(e){
    setForm({...form,[e.target.name]:e.target.value});
  }

  
  return (
    <div className='headers'>
    {loading && <Loading/>}
    <Container>
    <div className=' mt-5 ml-3'>
<div  className='form-group w-100 d-flex align-items-center justify-content-center'>
<form  onSubmit={submit} className="form w-100">
            <span className="input-span">
    <label htmlFor="name" className="label">Name</label>
    <input  type="text" name="name" id="name" required placeholder='enter yor name' value={form.name} onChange={handelForm}
  />
  </span>
  <span className="input-span">
    <label htmlFor="email" className="label">Email</label>
    <input type="email" name="email" id="email" required  placeholder='enter yor email'value={form.email} onChange={handelForm}

 /></span>

  <span className="input-span">
    <label htmlFor="password" className="label">password</label>
    <input type="password" name="password" id="password" required placeholder='enter yor password'  value={form.password} onChange={handelForm}
  />
  </span>
  <input className="submit" type="submit" required value="Sign up" />
  <span className="span-register">you have an account? <Link to='/login'>Login</Link></span>
  {err !=="" && <span className='error'>{err}</span>}
</form>
</div>
    </div>
    </Container>
    </div>
  );
}

