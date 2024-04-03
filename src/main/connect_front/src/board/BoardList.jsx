import axios from "axios"
import { useEffect, useState } from "react"
import Reply from "./Reply";

export default function BoardList(props){
   
     //1. useState 변수
     const [boardList , setBoardList]=useState( [] );

     console.log(boardList);
     useEffect(()=>{
         axios.get('/conn/b/get.do')
         .then((r)=> {
             console.log(r);
             setBoardList(r.data);
             
         })
         .catch(error=>{console.log(error)})
 
     },[])
 
     return(<>
         {
             boardList.map((board)=>{
                 return(<>
                            <section id="container">
                                <div className="innerContainer">
                                    
                                    <div className="content mainContent">
                                        <div className="topInfo">
                                            <div className="topImg"></div>
                                            <p>{board.mnickname}</p>
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
