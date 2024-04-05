import axios from 'axios';
import '../css/member.css';
import { useContext } from 'react';
import { LoginInfoContext } from '../index/Index';


export default function Login(props){

    const {loginInfo} = useContext(LoginInfoContext);

    const login = async()=>{

        const loginForm = document.querySelector('#loginForm');
        const loginFormData = new FormData(loginForm);
        console.log(loginForm);

        await axios.post('/conn/m/login.do',loginFormData)
        .then((r)=>{
            console.log(r);
            if(r.data){
                alert('로그인성공');
                console.log(loginInfo);
                window.location.href = "/board/sub"
            }else{
                alert('로그인실패');
            }
        })
        .catch(error=>{console.log(error)})
    }

    return(<>
         <div id="container">
            <div id='totalBox'>
                <div id="loginBox">
                    <p id='logoImg'>로고이미지</p>
                    <form id='loginForm'>
                        <input type="text" placeholder='아이디' name='mid' /><br/>
                        <input type="text" placeholder='비밀번호' name='mpw'/><br/>
                        <button type="button" onClick={login}>로그인</button>
                    </form>                    
                </div>
            </div>
         </div>
    </>)
}