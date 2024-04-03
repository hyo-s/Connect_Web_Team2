import { Link } from "react-router-dom";

export default function Edit(props){
    return(
        <div className="myInfo">
            <div>
                <div className='imgBox'>
                    <img src="/img/default.png" alt="" />
                </div>
                <input type="file" accept="img/*"/>
                <div>
                    이름 : <input type="text" value="유재석"/><br/>
                    닉네임 : <input type="text" value="aaa"/><br/>
                    전화번호 : <input type="text" value="010-1111-1111"/><br/>
                    이메일 : <input type="text" value="aaa@aaa.aaa"/><br/>
                    <Link to="/member/delete">회원탈퇴하기</Link>
                    <button>수정</button>
                </div>  
            </div>
        </div>
    )
}