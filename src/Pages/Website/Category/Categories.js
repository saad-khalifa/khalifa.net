import { Cat, CAT } from "../../../Api/api";
import { Axios } from '../../../Api/Axios';
import { useEffect, useState } from "react";
import TableShow from '../../../Components/DashBoard/TableShow';

export default function Categories(){
  // state
  const [categories,setCategories]=useState([]);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(3);
  const [loading,setLoading]=useState(false);
  const [total,setTotal]=useState('');

  // Get Category
  useEffect(()=>{
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data)=>{
        setCategories(data.data.data);
        setTotal(data.data.total)
  })
      .catch((err)=>console.log(err))
      .finally(()=>
        setLoading(false)
     )
        },[limit,page]);

        async function handelDelete(id){
          try{
           await Axios.delete(`${Cat}/${id}`);
            setCategories((prov)=>prov.filter((item)=> item.id !==id));
          }catch(err){
            console.log(err)
          }
        }


        const header=[
            {
              key:'title',
               name:'Title'
            },
            {
              key:'image',
              name:'Image'
            },
             {
              key:'created_at',
              name:'Created'
            },
             {
              key:'updated_at',
              name:'Update'
            },
            
        ]
  return(
      <div className='bg-white w-100 p-1'>
      <h1>Categories Page</h1>
          <TableShow 
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          searchLink={Cat}
          loading={loading}
          total={total}
          header={header} 
          data={categories} 
          delete={handelDelete}/>
    </div>
  );
}