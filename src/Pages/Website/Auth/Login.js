import '../../../Components/css/LoginAndRegister.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookie from 'cookie-universal';
import {baseURL, LOGIN } from '../../../Api/api';
import Loading from '../../../Components/Loading/Loading';
import { Container } from 'react-bootstrap';
export default function Login() {
    const [form,setForm]=useState({email:"",password:""});
    const [err,setErr]=useState("");
    // loading
    const [loading,setLoading]=useState(false);
      // cookie
      const cookie=Cookie();
  async function submit(e){
    e.preventDefault();
    setLoading(true);    
    try{
    const res = await axios.post(`${baseURL}/${LOGIN}`,form);
      setLoading(false);
      const token=res.data.token;
      cookie.set('commerce',token);
      const role=res.data.user.role;
      const go= role=== '1995' ? 'dashboard/users' : role==='1996' ? 'dashboard/writer' :'/';
      window.location.pathname=`${go}`
    }
    catch (err){
      if(err.response.status===401){
        setLoading(false)
        setErr("Email or password is error");
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
<div className='form-group w-100 d-flex align-items-center justify-content-center'>
<form onSubmit={submit} className="form">
<span className="input-span">
    <label htmlFor="email" className="label">Email</label>
    <input  type="email" name="email" id="email" required  
    placeholder='enter yor email...'
    value={form.email} onChange={handelForm}
 /></span>

  <span className="input-span">
    <label htmlFor="password" className="label">password</label>
    <input type="password" name="password" id="password" required 
    placeholder='enter yor password...'
    value={form.password} onChange={handelForm}
  />
  </span>

  <input className="submit" type="submit" required value="Log in" />
  {err !=="" && <span className='error'>{err}</span>}
  <span className="span-login">you have an account? <Link to='/register'>Sign up</Link></span>
  <div className='span' style={{color:"#514949"}}>-----or with-----</div>
</form>
</div>
    </div>
    </Container>
    </div>
   
  );
}

