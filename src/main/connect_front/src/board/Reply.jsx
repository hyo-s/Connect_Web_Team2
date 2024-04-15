import axios from "axios";
import { useContext, useRef, useState, useEffect } from "react";
import { LoginInfoContext } from "../index/Index";
import { Link  } from 'react-router-dom';

export default function Reply(props) {
    const { loginInfo } = useContext(LoginInfoContext);

    const replyFormRef = useRef();
    const [showAllComments, setShowAllComments] = useState(false); // 모든 댓글을 보여줄지 여부 상태

    const [replyList, setReplyList] = useState([]);
    const [rcontent, setRcontent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    
    useEffect(() => {
        axios.get('/conn/b/r/get.do', { params: { bno: props.board.bno } })
            .then((r) => {
                setReplyList(r.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    
    useEffect( ()=> {
        // 1. 
        let rcontent = document.querySelector('.rcontent')
        rcontent.scrollTop = rcontent.scrollHeight ;    // 상단 위치를 최하단 위치로 변경 
    })


    const onSubmit = (e) => {
        const replyFormData = new FormData(replyFormRef.current);
        replyFormData.set("mno", loginInfo.mno);
        replyFormData.set("bno", props.board.bno);
        if(editingCommentId>0){
            replyFormData.set("rno", editingCommentId);
            console.log(editingCommentId)
        }

        axios.post("/conn/b/r/post.do", replyFormData)
            .then(response => {
                if (response) {
                    alert('성공');
                    setRcontent('');
                    setEditingCommentId(null)

                    axios.get('/conn/b/r/get.do', { params: { bno: props.board.bno } })
                        .then((res) => {
                            setReplyList(res.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    alert('등록 실패');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const toggleComments = () => {
        setShowAllComments(!showAllComments);
    };

    // 댓글 삭제 함수
    const onDelete = (rno) => {
        axios.delete('/conn/b/r/delete.do', { params: { rno: rno } })
            .then((re) => {
                if (re) {
                    alert('삭제 성공');
                    setReplyList(replyList.filter(reply => reply.rno !== rno));
                } else {
                    alert('삭제 실패');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    // 댓글 수정 함수
    const onUpdate = (rno, rcontent) => {
        console.log('onUpdate')
        console.log(rno, rcontent)
        setRcontent(rcontent); // 수정할 댓글의 내용을 입력 폼에 설정
        setEditingCommentId(rno); // 수정 중인 댓글의 ID 설정
    }

    const replyBtn = (rno,rcontent)=>{
                return( <>
                    <button type="button" onClick={(e)=>onUpdate(rno,rcontent)}>수정</button>
                    <button type="button" onClick={(e)=>onDelete(rno)}>삭제</button>
                </>)
    }
    
    const length= replyList[replyList.length - 1]
        
 
    return (
        <div className="rcontent">
            <div>
                <p>댓글: {replyList.length}</p> {/* 총 댓글 수 출력 */}
            </div>

            {showAllComments && (
                <>
                    {replyList.map((reply, index) => (
                        <div key={index}>
                            {(index !== replyList.length - 1) && ( // 마지막 댓글이 아닌 경우에만 출력
                                <>
                                    <Link to={"/board/sub/"+reply.mnickname}><div key={reply.mno}>{reply.mnickname}</div></Link>
                                    <p>{reply.rcontent}</p>
                                    {loginInfo.mno == reply.mno &&
                                        replyBtn(reply.rno, reply.rcontent)
                                    }
                                </>
                            )}
                        </div>
                    ))}
                </>
            )}

            {replyList.length > 0 && (
                <div onClick={toggleComments}>
                    <Link to={"/board/sub/"+length.mnickname}><div key={length.mno}>{length.mnickname}</div></Link>
                    <p>{length.rcontent}</p>
                    {loginInfo.mno == length.mno &&
                        replyBtn(length.rno, length.rcontent)
                    }
                </div>
            )}

            <form ref={replyFormRef}>
                <div>{loginInfo.mnickname}</div>
                <input value={rcontent} name="rcontent" type="text" onChange={(e) => { setRcontent(e.target.value) }} />
                <button type="button" onClick={onSubmit}>{editingCommentId !== null ? "수정" : "등록"}</button>
                {
                    editingCommentId !== null ?
                    <button type="button" onClick={() => {setEditingCommentId(null); setRcontent('');}}>취소</button> : <></>
                }
            </form>
        </div>
    );
}
