import '../css/board.css';
import axios from 'axios';
import Reply from './Reply.jsx';
import BoardList from './BoardList.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MainBoard(props){

    const location = useLocation();
    //console.log(location.state.myBoard.r.bno)
    
    let boardArray = Array.from(location.state.myBoard.myBoard);
    //console.log(boardArray)


    const onUpdate = () =>{
        alert('수정')
    }

    
    const onDelete = (bno)=>{
        const info = location.state.myBoard.r.bno
        console.log(info)
        axios.delete('/conn/b/delete.do',info)
            .then((r)=>{
                console.log(r)
                alert('삭제')
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
                                            <button onClick={onUpdate}>수정</button>
                                        <button onClick={()=>onDelete(board.bno)}>삭제</button>
                                        </div>
                                        <ul>
                                            <li>
                                               d
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