import '../css/board.css';
import axios from 'axios';
import Reply from './Reply.jsx';
import BoardList from './BoardList.jsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";

export default function SubBaordMain(props){

    const location = useLocation();
    console.log(location.state)
    
    let boardArray = Array.from(location.state.myBoard.myBoard);
    console.log(boardArray)

    const nav = useNavigate();

    //게시글수정
    const onUpdate = (board) =>{
        //console.log(board)
        nav('/board/update',{state:{board:board}})        
    }

    //게시글삭제
    const onDelete = (bno)=>{
        console.log(bno);
        axios.delete('/conn/b/delete.do',{params:{bno:bno}})
            .then((r)=>{
                if(r.data){
                    console.log(r)
                    alert('삭제완료')
                    //window.location.href = '/board/sub/:mnickname'
                }else{
                    alert('삭제실패')
                }
                
            })
    }

    return(<>
        {
             boardArray.map((board)=>{
                 return(<>
                            <section id="container">
                                <div className="innerContainer">
                                    <div className="content mainContent">
                                        <div className="topInfo">
                                            <div className="topImg"></div>
                                            <p>{board.mnickname}</p>
                                            <button onClick={()=>onUpdate(board)}>수정</button>
                                        <button onClick={()=>onDelete(board.bno)}>삭제</button>
                                        </div>
                                        <ul>
                                            <li>
                                            <Carousel>                
                                                {
                                                    boardArray.length!=0 &&
                                                    boardArray.map((i)=>{
                                                        console.log(i.gnameList);
                                                        return(<>                                        
                                                            <img src={'/img/boardimg/'+i.gnameList} style={{width:"100%", height:400, objectFit:"cover"}}/>
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
                                            <li><a href="#">{board.mnickname}</a></li>
                                            <li>{board.bcontent}</li>
                                        </ul>
                                    </div>
                                    <div className="replyBox">
                                        <Reply board={board} />
                                    </div>
                                </div>
                            </section>
                        </>
                 )
             })
         }

     </>)

}