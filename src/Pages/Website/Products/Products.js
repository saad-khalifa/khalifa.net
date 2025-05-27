import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/DashBoard/TableShow";
import { Axios } from "../../../Api/Axios";
import { Pro, PRO } from "../../../Api/api";

export default function Products(){
// users
  const [product,setProduct]=useState([]);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(3);
  const[loading,setLoading]=useState(false);
  const [total,setTotal]=useState('');
const header=[
  {
    key:'images',
    name:'images'
  },
  {
    key:"title",
    name:"Title"
  },
  {
    key:"description",
    name:"Description"
  },
  {
    key:"price",
    name:"Price"
  },
  {
    key:"rating",
    name:"Rating"
  },
  {
name:'Create',
key:'created_at'
},
{
name:'Update',
key:'updated_at'
},
]

//Get all categories
useEffect(()=>{
  setLoading(true);
Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
.then((data)=>{
  setProduct(data.data.data);
  setTotal(data.data.total)
})
.catch((err)=>console.log(err))
.finally(()=>setLoading(false))
},[limit,page]);

// handelDelete
async function handelDelete(id){
  try{
    Axios.delete(`${Pro}/${id}`);
    setProduct((prov)=>prov.filter((item)=> item.id !==id))
  }catch(err){
    console.log(err)
  }
}
    return(
<div className="bg-white w-100 p-2 ">
  <div className="d-flex align-items-center justify-content-between">
  <h1>Product Page</h1>
<Link className="btn btn-primary" to={'/dashboard/categories/add'}>
Add Products
</Link> 
</div>

<TableShow 
limit={limit} 
setLimit={setLimit}
page={page}
setPage={setPage}
loading={loading}
total={total}
search={'title'}
searchLink={Pro}
header={header} 
data={product}
delete={handelDelete}
/>
</div>
    );
}