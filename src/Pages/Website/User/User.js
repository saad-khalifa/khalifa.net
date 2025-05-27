import { useEffect, useState } from 'react';
import { USER, USERS } from '../../../Api/api';
import { Axios } from '../../../Api/Axios';
import TableShow from '../../../Components/DashBoard/TableShow';
export default function User(){
  // state
  const [users,setUsers]=useState([]);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(3);
  const[loading,setLoading]=useState(false);
  const [total,setTotal]=useState('');
// Get users
    useEffect(()=>{
      setLoading(true);
      Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
        .then((data)=>{
          setUsers(data.data.data);
          setTotal(data.data.total);
        })
        .catch((err)=>console.log(err))
        .finally(()=>setLoading(false))
          },[limit,page]);

          async function handleDelete(id){
            try{
           await Axios.delete(`${USER}/${id}`);
           setUsers((prev)=>prev.filter((item)=>item.id !==id))
          }catch(err){
            console.log(err);
          }}

const header=[

{
name:'UserName',
key:'name'
},
{
  name:'Email',
  key:'email'
},
{
  name:'Role',
  key:'role'
},
{
name:'Created',
key:'created_at'
},
{
name:'Last Login',
key:'updated_at'
},
]
    return(
      <div className='bg-white w-100 p-1'>
          <h1>User Page</h1>
      <TableShow
       limit={limit} 
       setLimit={setLimit}
       page={page}
       setPage={setPage}
       loading={loading}
       search={'name'}
       searchLink={USER}
       total={total}
       header={header} 
       data={users} 
       delete={handleDelete}
       
       />
      </div>
    );
}