import axios from "axios"
import { useEffect, useState } from "react"
import Reply from "./Reply";
import ReplyView from "./ReplyList";
import Carousel from "react-material-ui-carousel";

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
                                            <div>{board.cdate} </div>
                                            <div className="topImg"> <img src={'/img/mimg/'+board.profilename} /> </div>
                                            <p>{board.mnickname}</p>
                                        </div>
                                        <ul>
                                            <li>
                                                <Carousel>                
                                                 {
                                                    board.gnameList.map((img)=>{
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
                                            <li><a href="#">{board.mnickname}</a></li>
                                            <li>{board.bcontent}</li>
                                        </ul>
                                    </div>
                                    <div className="replyBox" >
                                        <ReplyView board={board} look={1} />
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

export function BoardImg (props){
    const [imgList , setImgList]=useState( [] );
    console.log(props);

    console.log(imgList);
    useEffect(()=>{
        axios.get('/conn/b/img/get.do',{params:props}) // bno 매개변수로 넘겨줌
        .then((r)=> {
            console.log(r);
            setImgList(r.data);
        })
        .catch(error=>{console.log(error)})

    },[])

    return(<>
            {
                imgList.map((img)=>{
                    return(<>
                        <img src={img} style={{width:"100%", height:400, objectFit:"cover"}}/>
                    </>)
                })
            }
    </>)

}