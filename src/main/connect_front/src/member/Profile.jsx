import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Profile(){
    const {mnickname} = useParams();
    const [user, setUser] = useState({});
    const [mno, setMno] = useState();
    const [follower, setFollower] = useState(0);
    const [following, setFollowing] = useState(0);

    useEffect(()=>{
         axios.get("/conn/m/page/get.do",{params:{'mnickname':mnickname}})
        .then(response=>{
            setUser(response.data);
            setMno(response.data.mno);
        })
        .catch(error=>{console.log(error)})

    },[])
   
    const ddd = () =>{
        axios.get("/conn/m/follower/get.do",{params:{mno:mno}})
        .then(response=>{
            setFollower(response.data);
        })
        .catch(error=>{console.log(error)})
    }

    const dddd = () =>{
        axios.get("/conn/m/following/get.do",{params:{mno:mno}})
        .then(response=>{
            setFollowing(response.data);
        })
        .catch(error=>{console.log(error)})
    }

    useEffect( () => { ddd(); dddd() }  ,[mno] )

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
            <span>팔로우{following}명</span>
            <span>팔로워{follower}명</span>
        </div>
    )
}