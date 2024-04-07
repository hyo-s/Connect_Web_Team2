import axios from "axios";
import {  useEffect,  useState } from "react";


// 게시물에 해당하는 댓글 출력하기
export default function ReplyView(props){ 
    const [replyList , setReplyList]=useState( [] );

    console.log(replyList);
    useEffect(()=>{
        axios.get('/conn/b/r/get.do',{params:{bno:props.board.bno}}) // bno 매개변수로 넘겨줌
        .then((r)=> {
            console.log(r);
            setReplyList(r.data);
        })
        .catch(error=>{console.log(error)})

    },[])
    

    return (
        <>
            {props.look === 1 ? (
                // props.look이 1인 경우 마지막 인덱스만 출력
                <div>
                    <div>{replyList.length > 0 ? replyList[replyList.length - 1].mnickname : ""}</div>
                    <p>{replyList.length > 0 ? replyList[replyList.length - 1].rcontent : ""}</p>
                </div>
            ) : props.look2 === 2 ? (
                // props.look2가 2인 경우 전체 출력
                replyList.map((reply, index) => (
                    <div key={index}>
                        <div>{reply.mnickname}</div>
                        <p>{reply.rcontent}</p>
                    </div>
                ))
            ) : null}
        </>
    );
}

// export default function Reply (props){
//     const {loginInfo}=useContext(LoginInfoContext); // 현재 로그인 정보 불러옴
//     //1. 재렌더링 고정 참조 변수
//     const replyFormRef=useRef();
//     console.log(replyFormRef)

//     const onSubmit = (e)=>{ // 등록 통신
//         console.log(replyFormRef.current);
        
//         const replyFormData = new FormData(replyFormRef.current);
//         console.log(replyFormData);

//         replyFormData.set("mno", loginInfo.mno)
//         replyFormData.set("bno", props.board.bno) // 게시물 번호

//         axios.post("/conn/b/r/post.do", replyFormData)
//         .then(response => {
//             console.log(response);
//             if(response){
//                 alert('등록성공')
//                // window.location.href = '/board/myboard' // 재렌더링 생각
//             }else{
//                 alert('등록실패')
//             }
//         })
//         .catch(error => {console.log(error)})
//     }

//     return(<>
//         <ReplyView bno={props.board.bno} />
//         <form ref={replyFormRef}>
//             <div>{loginInfo.mnickname}</div> 
//             <input name="rcontent" type="text"/>
//             <button type="button" onClick={onSubmit}>등록</button>
//         </form>
//     </>)
// }
