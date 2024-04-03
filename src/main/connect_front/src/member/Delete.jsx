import axios from "axios";
import { useRef, useState } from "react"

export default function Delete(){

    const [mPassword, setMpassword] = useState('');

    const onCheckPassword = async(e)=>{
        setMpassword(e.target.value)
        await axios.get("/conn/m/check.password", {params:{mpassword : mPassword}})
        .then(response => {
            console.log (response);
            axios.delete("/conn/m/delete.do")
            .then(response => {console.log (response)})
            .catch(error=>{console.log(error)})
        })
        .catch(error=>{console.log(error)})

    }


    return(<>
        <form ref={setDeleteFrom}>
            <input type="text" name="mpassword" placeholder="비밀번호를 입력해주세요" onChange={onCheckPassword}/>
            <button type="button" onClick={onDeleteMember}>탈퇴하기</button>
        </form>
    </>)
}