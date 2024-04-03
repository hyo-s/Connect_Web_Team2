import { Link } from "react-router-dom";

export default function Header(props){
    return(<>
        <div className="header">
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/member/signup">회원가입</Link></li>
                <li><Link to="/member/login">로그인</Link></li>
                <li><Link to="/board/sub/">서브</Link></li>
                <li><Link to="/board/write">쓰기</Link></li>
                <li><Link to="/board">보드?</Link></li>
                <li><Link to="/member">멤버</Link></li>
            </ul>
        </div>
    </>)

}