import Skeleton from "react-loading-skeleton";

export default function SkeletonShow(props){
    const SkeletonLength=Array.from({length :props.length}).map((_,key)=>
    <div  className={props.classes}>
        <div className="mx-1">
          <Skeleton width={props.width} height={props.height}/> 
          </div>
        </div>)
    return(
SkeletonLength
    );
}