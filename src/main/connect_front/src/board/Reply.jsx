import axios from "axios";
import { useEffect, useState } from "react";

export default function Reply (props){
    return(<>
        <ReplyView bno={props.bno} />
        {/* <div>{props.mnikname}</div>
        <input type="text"/> */}

    </>)
}


export function ReplyView(props){
      //1. useState 변수
      const [replyList , setReplyList]=useState( [] );

      console.log(replyList);
      useEffect(()=>{
        axios.get('/conn/b/r/get.do',{params:{bno:props.bno}})
        .then((r)=> {
            //서버로 받은 데이터를 setState 넣어주면 재렌더링
            console.log(r);
            setReplyList(r.data);
        })
        .catch(error=>{console.log(error)})
  
      },[])
  
      return(<>
          {
              replyList.map((reply)=>{
                // const nik=reply.boardEntity.memberEntity.mnickname
                  return(<>
                            {/* <div>{nik}</div> */}
                            <p>{reply.rcontent}</p>
                        </>
                  )
              })
          }
        
      </>)
}