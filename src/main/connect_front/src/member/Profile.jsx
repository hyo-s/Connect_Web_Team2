import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Profile(){
    const {mnickname} = useParams();
    const [user, setUser] = useState({});

    useEffect(()=>{
        axios.get("/conn/m/page/get.do",{params:{'mnickname':mnickname}})
        .then(response=>{
            console.log(response)
            setUser(response.data);
        })
        .catch(error=>{console.log(error)})
    },[])

    return(
        <div className="myInfo">
            <div className='imgBox'>
                <img src={user.mimg} alt="" />
            </div>
            <ul>
                <li>{user.mname}</li>
                <li>{user.mnickname}</li>
                <li>{user.memail}</li>
            </ul>
            <span>팔로우{user.tofollow}명</span>
            <span>팔로워{user.fromfollow}명</span>
        </div>
    )
}