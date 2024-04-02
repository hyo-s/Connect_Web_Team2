import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Member(props){

    const [member, setMember] = useState([]);

    useEffect(()=>{
        axios.get("/conn/m/list/get.do")
        .then(response=>{
            setMember(response.data);
        })
        .catch(error=>{console.log(error)})
    },[])

    return(<>
            {member.map((data)=>{
                return (<Link to={"/board/sub/"+data.mnickname}><li key={data.mno}>{data.mname}</li></Link>)
            })}
    </>)
}