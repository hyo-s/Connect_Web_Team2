import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginInfoContext } from "../index/Index";

export default function Header(props){

    const {loginInfo, setLoginInfo } = useContext(LoginInfoContext);

    console.log(loginInfo);

    useEffect(()=>{
        axios.get("/conn/m/login/info/get.do")
        .then(response=>{
            console.log(response);
            setLoginInfo(response.data)
        })
        .catch(error=>{console.log(error)})
    },[])

    const onLogout = ()=>{
        axios.get('/conn/m/logout/get.do')
        .then(r=>{
            if(r.data){
                alert('로그아웃 성공');
                window.location.href = "/member/login"
            }else{alert('로그아웃실패')}
        })
        setLoginInfo('');
    }

    if(window.location.pathname === "/"){
        return null;
    }
    if(window.location.pathname === "/member/signup"){
        return null;
    }

    return(<>
        <div className="header">
            <div className="headerImg">
                <Link to="/conn"><img src="/img/connect_logo.png"/></Link>
            </div>
            <div>
                <div className="headerProfile">
                    <img src={"/img/mimg/"+loginInfo.mimg}/>
                    <div>
                        {loginInfo && <span> {loginInfo.mnickname}</span>}
                        <button type="button" onClick={onLogout}>로그아웃</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="header">
            <ul>
                <li><Link to="/conn">홈</Link></li>
                <li><Link to="/member/signup">회원가입</Link></li>
                <li><Link to="/board/sub">서브</Link></li>
                <li><Link to="/board/write">쓰기</Link></li>
                <li><Link to="/board">보드?</Link></li>
                <li><Link to="/member">멤버</Link></li>
                <li><Link to="/chat">채팅</Link></li>
            </ul>
        </div>
    </>)
}