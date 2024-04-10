import { useContext, useRef, useState } from "react"
import { LoginInfoContext } from "../index/Index";
import { useLocation} from 'react-router-dom';

export default function Chatting(props){

    let clientSocket = useRef(null);

    //받는사람정보
    const location = useLocation();
    console.log(location.state.mnickname);

    //로그인정보가져오기
    const {loginInfo} = useContext(LoginInfoContext);
    

    if(!clientSocket.current){
        clientSocket.current = new WebSocket('ws://175.212.253.226:80/chat');
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

    //메세지 보내기
    const onSend = (e)=>{

        let info = {
            msg : msgInput,
            forMnickname : loginInfo.mnickname,
            toMnickname : location.state.mnickname,
            img : loginInfo.mimg
        }
        clientSocket.current.send(JSON.stringify(info));
        e.preventDefault(e);
        setMsgInput('');
    }

    //입력창
    const [msgInput, setMsgInput] = useState('');
    //보기창
    const [msgList, setMsgList] = useState([]);
    //입력창 엔터
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
                    console.log(msg);
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