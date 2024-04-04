import '../css/board.css';
import { useParams } from 'react-router-dom';
import '../css/board.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SubBoard(props) {

    const [myBoard, setMyBoard] = useState([]);
    const {mnickname} = useParams();
    const [ nBno, setNBno] = useState(0);
    
    
    
    console.log(myBoard)

    useEffect(()=>{

        axios.get('/conn/b/myboard/get.do', {params:{mnickname : mnickname}})
            .then((r)=>{
                console.log(r)
                setMyBoard(r.data);
            })
    },[])

    const onClickSubBoard = (e, bno) =>{
        console.log(bno);
        axios.get('/conn/b/myboard/get.do',{params: {mnickname : mnickname, bno : bno}})
            .then((r)=>{
                //window.location.href = "/baord/submain/:mnickname?:bno"
                console.log(r);
                console.log(r.bno);
                console.log(mnickname);
                alert('서브상세페이지')
            })
    }

    return(<>
        <section id="container">
            <div>
                <div className="myInfo">
                    <div className='imgBox'><img src="" alt="" /></div>
                    <ul>
                        <li>정보</li>
                    </ul>
                    <span>팔로우</span>
                    <span>팔로워</span>
                </div>
                <div className="content subContent">
                <ul className='potoList' >
                    {myBoard.map((r)=>{ 
                        console.log(r);
                        console.log(r.bno);
                        return(<>                           
                                <li><img src={"/img/boardimg/" +r.gnameList[0]} className='gnameList' onClick={(e)=>onClickSubBoard(e, r.bno)}></img></li>                  
                            
                        </>)
                    })}
                </ul>
                </div>
            </div>
        </section>
    </>)
}