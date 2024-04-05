import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { LoginInfoContext } from "../index/Index";

export default function Profile(){
    const {loginInfo} = useContext(LoginInfoContext);
    const {mnickname} = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const isLinkDisabled = loginInfo === '';

    useEffect( ()=>{
        const getMember = async ()=>{
            await axios.get("/conn/m/page/get.do",{params:{'mnickname':mnickname}})
            .then(response=>{
                console.log(response)
                setUser(response.data);
                setLoading(false);
            })
            .catch(error=>{
                console.log(error);
                setLoading(false);
            })
        } 
        getMember();
    }, [mnickname])

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(loginInfo);
    console.log(user);
    return(<>
        <div className="myInfo">
            <div>
                <div className='imgBox'>
                    <img src={user.mimg != 'default.png' ? "/img/mimg/"+user.mimg : "/img/mimg/default.png"} alt="" />
                </div>
                <ul>
                    <li>{user.mname}</li>
                    <li>{user.mnickname}</li>
                    <li>{user.memail}</li>
                </ul>
                <span>팔로우{user.tofollow}명</span>
                <span>팔로워{user.fromfollow}명</span>
            </div>
            <div>
                {isLinkDisabled?(<></>):loginInfo.mno === user.mno?(<Link to={"/member/edit/"+loginInfo.mnickname}>수정</Link>):(<></>)}
            </div>
        </div>
    </>)
}