import { useEffect, useState } from "react";

export default function PlusMinusBtn(props){
    const [btn,setBtn]=useState(1);

    useEffect(()=>{
        props.setCount(btn);
        if(props.changeCount){
            props.changeCount(props.id,btn)
        }
    },[btn])

    useEffect(()=>{
        if(props.count){
            setBtn(props.count)
        }
    },[props.count])

    return(
        <div className="input-group d-flex align-items-center gap-2">
            <span
            className="input-group-btn"
            onClick={(e)=>{
                if(btn>0){
                    setBtn((prov)=> prov -1);
                }else{
                    setBtn(0)
                }
            }}
            >
                <button
                type="button" className="btn btn-danger btn-number" datatype="minus" data-field='quant[2]'>
                    <i className="fas fa-minus"></i>
                </button>
            </span>
            <div>
                <input type="number" name="quant[2]" className="form-control input-number" min={1} max={100}
                 value={btn} onChange={(e)=>{
                    if(e.target.value>0){
                        setBtn(e.target.value)
                    }else{
                        setBtn(0)
                    }
                }
                } />
            </div>
            <span className="input-group-btn"
            onClick={()=>setBtn((prov)=>++prov)}>
                <button type="button" className="btn btn-success btn-number" datatype="plus" data-field="quant[2]">
                    <i className="fas fa-plus"></i>
                </button>
            </span>

        </div>
    )
}