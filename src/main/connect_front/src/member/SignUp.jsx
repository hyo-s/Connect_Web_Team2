import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp(props){
    /*.mno(this.mno)
                .mid(this.mid)
                .mpw(this.mpw)
                .mname(this.mname) 
                sdf
                
                아이디 : 
                .mNikname(this.mNikname)
                .memail(this.memail)
                .mphone(this.mphone)
                .mbirth(this.mbirth) */
    
    const onSignup = (e)=>{
        const axiosForm=document.querySelector('#signupForm')
        const axiosFormData= new FormData(axiosForm)
        axios.post('http://localhost:80/conn/m/signup',axiosFormData)
            .then(response=>{console.log(response);})
            .catch(error=>{console.log(error);})
    }

    return(<>
        <section id="container">
            <div className="innerContainer">
                <div className="content">
                    <form id='signupForm'>
                        프로필 사진 등록: <input name="mfile"type='file' /><br/>
                        이름 : <input name="mname" type="text"/> <br/>
                        아이디 : <input name="mid" type="text"/><br/>
                        비밀번호 : <input name="mpw" type="text"/><br/>
                        닉네임 : <input name="mnikname" type="text"/><br/>
                        이메일 : <input name="memail" type="text"/><br/>
                        전화번호 : <input name="mphone" type="text"/><br/>
                        생년월일 : <input name="mbirth" type="date"/><br/>
                    </form>
                    <button type="button" onClick={onSignup} >Signup</button>
                </div>
            </div>
        </section>
    </>);
   
}