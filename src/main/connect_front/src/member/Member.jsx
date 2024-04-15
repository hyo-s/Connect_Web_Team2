import axios from "axios"
import { useEffect, useState } from "react"
import { Link , resolvePath, useLocation  } from 'react-router-dom';

export default function Member(){

    const [member, setMember] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('search');
    console.log(searchValue);

    useEffect(()=>{
        axios.get("/conn/m/list/get.do", {params: {search: searchValue}})
        .then(response=>{
            setMember(response.data);
            console.log(response.data)
        })
        .catch(error=>{console.log(error)})
    },[searchValue])

    return(<>
        <div id="container">
            {member.map((data)=>{
                console.log(data.profilename)
                return (<div key={data.mno}>
                    <div className="topInfo">
                    <div className="topImg"><img src={'/img/mimg/'+data.mimg} /></div>
                    <Link to={"/board/sub/"+data.mnickname}><div key={data.mno}>{data.mnickname}</div></Link>
                    </div>
                </div>)
            })}
        </div>
    </>)
}