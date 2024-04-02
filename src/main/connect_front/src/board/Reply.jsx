import axios from "axios";
import { useEffect, useState } from "react";

export default function Reply (props){
    return(<>
        <div>{props.mnikname}</div>
        <input type="text"/>

    </>)
}

export function ReplyView(props){
      //1. useState 변수
      const [replyList , setReplyList]=useState( [] );

      console.log(replyList);
      useEffect(()=>{
          axios.get('')
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
                  return(<>
                            <div>{reply.mnikname}</div>
                            <p>{reply.rcontent}</p>
                        </>
                  )
              })
          }
        
      </>)
}