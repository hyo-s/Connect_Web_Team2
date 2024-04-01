import axios from 'axios';
import styles from './Member.css';


export default function Login(props){

    const login = ()=>{

        const loginForm = document.querySelector('#loginForm');
        const loginFormData = new FormData(loginForm);
        console.log(loginForm);

        axios.post('/conn/m/login.do',loginFormData)
        .then((r)=>{
            console.log(r);
            if(r.data){
                alert('로그인성공');
                
            }else{
                alert('로그인실패');
            }

        })
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