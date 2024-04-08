import axios from "axios";
import { useContext, useRef, } from "react";
import { LoginInfoContext } from "../index/Index";

export default function Reply (props){
    const {loginInfo}=useContext(LoginInfoContext); // 현재 로그인 정보 불러옴
    //1. 재렌더링 고정 참조 변수
    const replyFormRef=useRef();
    console.log(replyFormRef)

    const onSubmit = (e)=>{ // 등록 통신
        console.log(replyFormRef.current);

        const replyFormData = new FormData(replyFormRef.current);
        console.log(replyFormData);

        replyFormData.set("mno", loginInfo.mno)
        replyFormData.set("bno", props.board.bno) // 게시물 번호

        axios.post("/conn/b/r/post.do", replyFormData)
        .then(response => {
            console.log(response);
            if(response){
                alert('등록성공')
               // window.location.href = '/board/myboard' // 재렌더링 생각
            }else{
                alert('등록실패')
            }
        })
        .catch(error => {console.log(error)})
    }

    return(<>
        <form ref={replyFormRef}>
            <div>{loginInfo.mnickname}</div>
            <input name="rcontent" type="text"/>
            <button type="button" onClick={onSubmit}>등록</button>
        </form>
    </>)
}

/*
// 게시물에 해당하는 댓글 출력하기
export function ReplyView(props){
      const [replyList , setReplyList]=useState( [] );

      console.log(replyList);
      useEffect(()=>{
          axios.get('/conn/b/r/get.do',{params:{bno:props.bno}}) // bno 매개변수로 넘겨줌
          .then((r)=> {
              console.log(r);
              setReplyList(r.data);
          })
          .catch(error=>{console.log(error)})
  
      },[])
  
      return(<>
          {
              replyList.map((reply)=>{s
                  return(<>
                            <div>{reply.mnickname}</div>
                            <p>{reply.rcontent}</p>
                        </>
                  )
              })
          }
        
      </>)
}*/