import StringSlice from '../../../helpers/StringSlice';
import { NavLink } from 'react-router-dom';
export default function TopRated(props){
    const roundStars=Math.round(props.rating);
    const stars=Math.min(roundStars,5);

    const showGoldStars=Array.from({length:stars}).map((_,key)=>
            <i key={key} style={{ color:'yellow' }} className='fas fa-star'></i>
    )
        const showEmptyStars=Array.from({length:5-stars}).map((_,key)=>
                <i key={key} className='far fa-star'></i>
    )
    return(
    <NavLink to={`/product/${ props.id }`}  className='col-12 border-bottom d-flex align-items-center justify-content-center   flex-wrap mb-5'
    style={{ border:'1px solid #808080' }}>
    <div className='col-md-4 col-12 '
    alt=''
            style={{ 
            backgroundImage: `url('${props.img}')`,
            backgroundPosition:'center',
            backgroundSize:'cover',
            height:'200px',
         }}
    ></div>

    <div className='m-1 border rounded p-3 h-100 w-100 d-flex flex-column justify-content-between' >
    <div>
    <p className='text-truncate' style={{ color:'gray' }}>{StringSlice(props.title)}</p>
    <p className='text-truncate'>{StringSlice(props.description)}</p>
    </div>
    
    <div className='px-5 py-4 position-relative'>
    {props.sale && <p className='m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center'
    style={{ width:'50px',height:'50px',lineHeight:'50px' }}>sale
    </p>}
    <div>

        <div
>

        </div>
    </div>

    <div className='d-flex align-items-center justify-content-between pt-4'>
    <div>
         {showGoldStars}
         {showEmptyStars}

        <div className='d-flex align-items-center gap-3'>
        <h5 className='m-0 text-primary'>{props.discount}$</h5>
        <h6 className='m-0' style={{ color:'gray',textDecoration:'line-through' }}>{props.price}$</h6>
    </div>
    </div>
    <div className='border p-2 rounded'>
    <i width='20px' className='fas fa-shopping-cart'></i>
    </div>
    </div>
    </div>
    </div>
    </NavLink>
    );
}