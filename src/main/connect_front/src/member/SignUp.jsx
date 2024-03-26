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

    const[mid,setMid]=useState('');             //아이디
    const[mpw,setMpw]=useState('');             //비밀번호
    const[mname,setMname]=useState('');         //이름
    const[mNikname,setMNikname]=useState('');   //닉네임
    const[memail,setMemail]=useState('');       //이메일    
    const[mphone,setMphone]=useState('');       //전화번호
    const[mbirth,setMbirth]=useState('');       //생년월일

    const onSignup = (e)=>{
        let info={
            mid:mid,
            mname:mname,
            memail:memail,
            mpw:mpw, 
            mkikname:mNikname,
            mphone:mphone,
            mbirth:mbirth
        }
        axios.post("http://localhost:80/conn/m/signup" , info)
            .then(response=>{console.log(response)})
    }

    return(<>
        <form>
            이름 : <input value={mname} type="text" onChange={(e)=> setMname(e.target.value)}/> <br/>
            아이디 : <input value={mid} type="text" onChange={(e)=> setMid(e.target.value)}/><br/>
            비밀번호 : <input value={mpw} type="text" onChange={(e)=> setMpw(e.target.value)}/><br/>
            닉네임 : <input value={mNikname} type="text" onChange={(e)=> setMNikname(e.target.value)}/><br/>
            이메일 : <input value={memail} type="text" onChange={(e)=> setMemail(e.target.value)}/><br/>
            전화번호 : <input value={mphone} type="text" onChange={(e)=> setMphone(e.target.value)}/><br/>
            생년월일 : <input value={mbirth} type="date" onChange={(e)=> setMbirth(e.target.value)}/><br/>
        </form>
        <button type="button" onClick={onSignup} >Signup</button>
    </>);
   
}