import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../Paginations/pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import TransformDate from "../../helpers/TransformDate";
export default function TableShow(props){
  const [search,setSearch]=useState('');
    const [date,setDate]=useState('');
  const [filterData,setFilterData]=useState([]);
  const [searchLoading,setSearchLoading]=useState(false);

  const filterDataByDate=date.length !==0 ? 
  props.data.filter((item)=> TransformDate(item.created_at) ===date):props.data;
  const searchByDate=date.length !==0 ? filterData.filter((item)=>TransformDate(item.created_at) ===date):filterData;
  const showWithData=
  date.length !==0 ?
  search.length > 0 ? searchByDate : filterDataByDate : search.length > 0 ? filterData : props.data ;

        async function searchData(){
              try{
            const res= await Axios.post(`${props.searchLink}/search?title=${search}`)
             setFilterData(res.data)
            }catch(err){
              console.log(err)
            }
            finally{
              setSearchLoading(false)
            }
          }

          useEffect(()=>{
            const deb=setTimeout(()=>{
             search.length > 0 ? searchData() : setSearchLoading(false);
            },500)
            return ()=>clearTimeout(deb)
          },[search])
    

   const headerShow=props.header.map((item,key)=>(
    <th className="text-center" key={key}>{item.name}</th>
   ));

   const dataShow=showWithData.map((item,key)=>(
    <tr className="text-center" key={key} >
    <td className="text-center">{item.id}</td>
    
        {props.header.map((item2,key2)=>(
            <td className="text-center" key={key2}>{item2.key==='image' ? (
              <img width='50px' src={item[item2.key]}/>
            ):
            item2.key==='images' ?(
              <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
                {
                  item[item2.key].map((img,key)=>(
                    <img key={key} width='50px' src={img.image} alt=""></img>
                  ))
                }
              </div>
            )
            
            
            : item2.key==='created_at' || item2.key==='updated_at'? 
            TransformDate(item[item2.key])
            :
         item[item2.key]=== '1995' ? 'admin':
         item[item2.key] ==='2001' ? 'user' :
         item[item2.key]==='1996'? 'writer':
         item[item2.key]==='2001' ?'user':
         item[item2.key]==='1999' ? 'product Manger':
         item[item2.key]
            }</td>
        ))}
        <td className="text-center">
        <div className="d-flex align-items-center gap-5" style={{ marginLeft:"35px" }}>
<Link to={`${item.id}`} className="fas fa-user-edit" style={{fontSize:"20px"}}></Link>

<i 
 className="far fa-trash-alt" onClick={()=>props.delete(item.id)}  style={{color:"red",fontSize:'20px',cursor:"pointer", display:item.role==='1995' ? 'none' :'block'}}></i>

</div>
    </td>
    </tr>
   ))
  
    return(
        <div className='bg-white w-100 p-1'>
 <div >
  
      <div  className=' mt-3 position-relative'>
         <Form.Control
         type='search' 
        value={search}
      onChange={(e)=>{
       setSearch(e.target.value);
      setSearchLoading(true);

      }}
      className='form-control custom-search py-3 rounded-0'
     placeholder='search'
        />
       <h3 className='btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center'>
        <i className="fas fa-search-plus"></i>
        </h3>
     </div>
 </div>

<div  className="col-3 mt-2">
        <Form.Control style={{ marginBottom:'8px'}}
      type="date"
      onChange={(e)=>{
        setDate(e.target.value);
      }}
      />
</div>
      
          
    <Table striped bordered hover>
    <thead>
      <tr>
        <th className="text-center">id</th>
        {headerShow}
        <th className="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
        {props.loading ? (
        <tr className="text-center">
            <td colSpan={12}>Loading...</td>
        </tr>
        ): searchLoading ? (
          <tr className="text-center">
          <td colSpan={12}>Searching...</td>
        </tr>
        ):
        dataShow
      }      

    </tbody>
  </Table>
  <div className="d-flex align-items-center justify-content-end flex-wrap">
  <div className="col-1">
  <Form.Select onChange={(e)=>props.setLimit(e.target.value)}>
<option value='3'>3</option>
<option value='5'>5</option>
<option value='10'>10</option>
<option value='15'>15</option>
  </Form.Select>
</div>
  <PaginatedItems 
  setPage={props.setPage} 
  itemsPerPage={props.limit} 
  data={props.data}
  total={props.total}
  />
  </div>
  </div>
    );
}