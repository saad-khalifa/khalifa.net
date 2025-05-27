import { Link } from 'react-router-dom';
import './Err403.css';
export default function Err403({role}){
    console.log(role)
    return(
        <div className='text-wrapper'>
            <div className='title' data-content={403}>
                404 -ACCESS DENIED
            </div>
            <div className='subtitle'>
                Oops, You don't have permission to access this page
                <Link className='d-block mt-5 btn text-center w-100 btn-primary ' to={role==='1996' ? '/dashboard/writer' : "/"}>
                {role ==='1996' ? ('Go To Writer Page') : 'Go To Home Page' }
                
                </Link>

            </div>
        </div>
    )
}