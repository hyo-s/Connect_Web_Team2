import '../css/board.css';
import axios from 'axios';
import Reply from './Reply.jsx';
import BoardList from './BoardList.jsx';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import ReplyView from "./ReplyList";

export default function SubBaordMain(props){

    //로그인정보
    //const {loginInfo} = useContext(LoginInfoContext);
    //console.log(loginInfo);

    //보드정보
    const location = useLocation();
    const nav = useNavigate();
    const { myBoard } = location.state || {};

    console.log(myBoard);

    useEffect(() => {
        // myBoard가 유효한 배열인지 확인 후 로직 수행
        if (myBoard && Array.isArray(myBoard)) {
            console.log(myBoard);
        }
    }, [myBoard]); // myBoard가 변경될 때만 useEffect 실행

    //게시글수정
    const onUpdate = (board) =>{
        //console.log(board)
        nav('/board/update',{state:{board}})
    }

    //게시글삭제
    const onDelete = (bno, mnickname)=>{
        console.log(mnickname);
        axios.delete('/conn/b/delete.do',{params:{bno:bno}})
            .then((r)=>{
                if(r.data){
                    console.log(r)
                    alert('삭제완료')
                    window.location.href = '/board/sub/'+mnickname
                }else{
                    alert('삭제실패')
                }
                
            })
    }

    const r = location.state.myBoard.r;
    console.log(r);

    return(<>
       {
        <section id="container">
            <div className="innerContainer">
                <div className="content mainContent">
                    <div className="topInfo">
                        {/* <div>{r.cdate} </div> */}
                        <div className="topImg"> <img src={'/img/mimg/'+r.profilename} /> </div>
                        <p>{r.mnickname}</p>
                        {

                        }
                            <button onClick={()=>onUpdate(r)}>수정</button>
                            <button onClick={()=>onDelete(r.bno, r.mnickname)}>삭제</button>

                    </div>
                    <ul>
                        <li data-interval="false">
                            <Carousel autoPlay={false}>
                                {
                                r.gnameList.map((img)=>{
                                    return(<>
                                        <img src={"/img/boardimg/"+img} style={{width:"100%", height:400, objectFit:"cover"}}/>
                                    </>)
                                })
                            }
                            </Carousel>
                        </li>
                    </ul>
                </div>
                <div className="btmBox">
                    <ul>
                        <li>♥</li>
                    </ul>
                    <ul className="btmInfo">
                        <li><a href="#">{r.mnickname}</a></li>
                        <li>{r.bcontent}</li>
                    </ul>
                </div>
                <div className="replyBox" >
                    <ReplyView board={r} look={1} />
                    <Reply board={r} />
                </div>
            </div>
        </section>
        }

     </>)

}