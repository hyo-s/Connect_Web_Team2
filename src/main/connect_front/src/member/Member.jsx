import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Member(){

    const [member, setMember] = useState([]);

    useEffect(()=>{
        axios.get("/conn/m/list/get.do")
        .then(response=>{
            setMember(response.data);
        })
        .catch(error=>{console.log(error)})
    },[])

    return(<>
        <div id="container">
            {member.map((data)=>{
                return (<div key={data.mno}>
                    <Link to={"/board/sub/"+data.mnickname}><li key={data.mno}>{data.mname}</li></Link>
                </div>)
            })}
        </div>
    </>)
}