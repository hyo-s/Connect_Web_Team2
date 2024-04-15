import axios from "axios"
import { useEffect, useState } from "react"
import Reply from "./Reply";
import Carousel from "react-material-ui-carousel";
import Like from "./Like";

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
                console.log(board.gnameList)
                 return(<>
                            <section id="container">
                                <div className="innerContainer">
                                    <div className="content mainContent">
                                        <div className="topInfo">
                                            <div className="topImg"> <img src={'/img/mimg/'+board.profilename} /> </div>
                                            <p>{board.mnickname}</p>
                                            <div>{board.cdate} </div>
                                        </div>
                                        <ul>
                                            <li>
                                                <Carousel sx={{ width: '100%', height:'370px'}}>                
                                                 {
                                                    board.gnameList.map((img)=>{
                                                        return(<>
                                                            <img src={"/img/boardimg/"+img} style={{width:"100%", height:350, objectFit:"cover"}}/>
                                                        </>)
                                                    })
                                                }
                                                </Carousel>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="btmBox">
                                        <ul>
                                            <Like bno={board.bno}/>
                                        </ul>
                                        <ul className="btmInfo">
                                            <li><a href="#">{board.mnickname}</a></li>
                                            <li>{board.bcontent}</li>
                                        </ul>
                                    </div>
                                    <div className="replyBox" >
                                        {/* <ReplyView board={board} look={1} /> */}
                                        <Reply board={board}/>
                                    </div>
                                </div>
                            </section>
                        </>
                 )
             })
         }

     </>)
}
    