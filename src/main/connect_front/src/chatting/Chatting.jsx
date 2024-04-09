import { useContext, useRef, useState } from "react"
import { LoginInfoContext } from "../index/Index";

export default function Chatting(props){

    let clientSocket = useRef(null);

    //로그인정보가져오기
    const {loginInfo} = useContext(LoginInfoContext);

    if(!clientSocket.current){
        clientSocket.current = new WebSocket('ws://192.168.17.128:80/chat');
        clientSocket.current.onclose = (e) => {console.log(e);}
        clientSocket.current.onerror = (e) => {console.log(e);}
        clientSocket.current.onmessage = (e) => {
            console.log(e);
            msgList.push(JSON.parse(e.data));
            setMsgList([...msgList])
            console.log(msgList);
        }
        clientSocket.current.onopen = (e) => {console.log(e);}     

    }
 
    const onSend = (e)=>{

        let info = {
            msg : msgInput,
            forMnickname : loginInfo.mnickname,
            img : loginInfo.mimg
        }
        clientSocket.current.send(JSON.stringify(info));
        e.preventDefault(e);
        setMsgInput('');
    }

    //입력창
    const [msgInput, setMsgInput] = useState('');
    const [msgList, setMsgList] = useState([]);
    const activeEnter = (e)=>{
        //console.log(e);
        if(e.keyCode == 13 && e.ctrlKey){
            setMsgInput(msgInput+"\n"); return;
        }
        if(e.keyCode == 13){
            onSend(e); return
        }
    }





    return (<>
        <div>채팅</div>
        <div>
            {
                msgList.map((msg)=>{
                    return(<>
                        {loginInfo.mnickname == msg.forMnickname ?  <div>{msg.msg}</div> : 
                        <div><img src={"/img/mimg/default.png"} style={{height:20}}/>{msg.forMnickname}:{msg.msg}
                        </div>}
                        
                    </>)
                })
            }
        </div>
        <textarea value={msgInput} onChange={(e)=>{setMsgInput(e.target.value)}} onKeyDown={activeEnter}></textarea>
        <button type="button" onClick={onSend}>전송</button>
    </>)
}