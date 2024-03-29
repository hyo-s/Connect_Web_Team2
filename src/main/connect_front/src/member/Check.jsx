import axios from "axios";
import { useState } from "react"

let checkArray = [false, false, false, false]

export default function Check(props){

    const [findId, setFindId] = useState('');
    const [findNickName, setFindNickName    ] = useState('');
    const [findEmail, setFindEmail] = useState('');
    const [findPhoneNumber, setFindPhoneNumber] = useState('');

    const onChangeFindIdCheck = async (e)=>{
        const inputId = e.target.value;

        let idRule = /^[a-z]+[a-z0-9]{5,19}$/;
        if(idRule.test(inputId)){
            console.log('true');
        }else{
            console.log('false');
        }
        // await axios.get("http://localhost:80/conn/m/check.id",{params:{'mid':inputId}})
        // .then(response =>{
        //     setFindId(inputId);
        //     checkArray[0] = response.data;
        // })
        // .catch(error=>{console.log(error);})
    }

    const onChangeFindNickNameCheck = async (e)=>{
        const inputNickName = e.target.value;
        await axios.get("http://localhost:80/conn/m/check.nickname",{params:{'nickName':inputNickName}})
        .then(response =>{
            setFindNickName(inputNickName);
            checkArray[1] = response.data;
        })
        .catch(error=>{console.log(error);})
    }

    const onChangeFindEmailCheck = async (e)=>{
        const inputEmail = e.target.value;
        await axios.get("http://localhost:80/conn/m/check.email",{params:{'email':inputEmail}})
        .then(response =>{
            setFindEmail(inputEmail);
            checkArray[2] = response.data;
        })
        .catch(error=>{console.log(error);})
    }

    const onChangeFindPhoneNumberCheck = async (e)=>{
        const inputPhoneNumber = e.target.value;
        await axios.get("http://localhost:80/conn/m/check.phonenumber",{params:{'phoneNumber':inputPhoneNumber}})
        .then(response =>{
            setFindPhoneNumber(inputPhoneNumber);
            checkArray[3] = response.data;
        })
        .catch(error=>{console.log(error);})
    }



    return(<>
        <input type="text" name="mid" placeholder="아이디를 입력해주세요" value={findId} onChange={onChangeFindIdCheck}/>
        { checkArray[0] ? <span>중복된 아이디 입니다.</span> : ''}
        <input type="text" name="mnikname" placeholder="닉네임을 입력해주세요" value={findNickName} onChange={onChangeFindNickNameCheck}/>
        { checkArray[1] ? <span>중복된 닉네임 입니다.</span> : ''}
        <input type="text" name="memail" placeholder="이메일을 입력해주세요" value={findEmail} onChange={onChangeFindEmailCheck}/>
        { checkArray[2] ? <span>중복된 이메일 입니다.</span> : ''}
        <input type="text" name="mphone" placeholder="전화번호를 입력해주세요" value={findPhoneNumber} onChange={onChangeFindPhoneNumberCheck}/>
        { checkArray[3] ? <span>중복된 전화번호 입니다.</span> : ''}
    </>)
}