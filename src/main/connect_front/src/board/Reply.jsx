import axios from "axios";
import { useContext, useRef, useState, useEffect } from "react";
import { LoginInfoContext } from "../index/Index";

export default function Reply(props) {
    const { loginInfo } = useContext(LoginInfoContext);

    const replyFormRef = useRef();
    const [rcontent, setRcontent] = useState(props.rcontent || '');
    const [showAllComments, setShowAllComments] = useState(false); // 모든 댓글을 보여줄지 여부 상태
    const [totalComments, setTotalComments] = useState(0); // 총 댓글 수

    const [replyList, setReplyList] = useState([]);

    useEffect(() => {
        axios.get('/conn/b/r/get.do', { params: { bno: props.board.bno } })
            .then((r) => {
                setReplyList(r.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const onSubmit = (e) => {
        const replyFormData = new FormData(replyFormRef.current);
        replyFormData.set("mno", loginInfo.mno);
        replyFormData.set("bno", props.board.bno);

        axios.post("/conn/b/r/post.do", replyFormData)
            .then(response => {
                if (response) {
                    alert('등록 성공');
                    setRcontent('');

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
        return <Reply rno={rno} rcontent={rcontent} />
    }

    const replyBtn = (rno,rcontent)=>{
                return( <>
                    <button type="button" onClick={(e)=>onDelete(rno)}>삭제</button>
                    <button type="button" onClick={(e)=>onUpdate(rno,rcontent)}>수정</button>
                </>)
            }

 
    return (
        <>
            <div>
                <p>댓글: {replyList.length}</p> {/* 총 댓글 수 출력 */}
            </div>

            {showAllComments && (
                <>
                    {replyList.map((reply, index) => (
                        <div key={index}>
                            {(index !== replyList.length - 1) && ( // 마지막 댓글이 아닌 경우에만 출력
                                <>
                                    <div>{reply.mnickname}</div>
                                    <p>{reply.rcontent}</p>
                                    {loginInfo.mno == reply.mno &&
                                        replyBtn()
                                    }
                                </>
                            )}
                        </div>
                    ))}
                </>
            )}

            {replyList.length > 0 && (
                <div onClick={toggleComments}>
                    <div>{replyList[replyList.length - 1].mnickname}</div>
                    <p>{replyList[replyList.length - 1].rcontent}</p>
                    {replyBtn()}
                </div>
            )}

            <form ref={replyFormRef}>
                <div>{loginInfo.mnickname}</div>
                <input value={rcontent} name="rcontent" type="text" onChange={(e) => { setRcontent(e.target.value) }} />
                <button type="button" onClick={onSubmit}>{props.rno > 0 ? "수정" : "등록"}</button>
            </form>
        </>
    );
}