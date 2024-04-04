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

    // 2. 로그아웃
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

    return(<>
        <div className="header">
            {loginInfo && <span>{loginInfo.memail}님 {loginInfo.mnickname}님</span> }
            <button type="button" onClick={onLogout}>로그아웃</button>
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/member/signup">회원가입</Link></li>
                <li><Link to="/member/login">로그인</Link></li>
                <li><Link to="/board/sub/">서브</Link></li>
                <li><Link to="/board/write">쓰기</Link></li>
                <li><Link to="/board">보드?</Link></li>
                <li><Link to="/member">멤버</Link></li>
                <li><Link to={"/member/edit/"+loginInfo.mnickname}>수정</Link></li>
            </ul>
        </div>
    </>)
}