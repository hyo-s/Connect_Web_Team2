import '../css/board.css';
import { useParams } from 'react-router-dom';
import '../css/board.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SubBoard(props) {

    const [myBoard, setMyBoard] = useState([]);
    const {mnickname} = useParams();
    console.log(myBoard)

    useEffect(()=>{

        axios.get('/conn/b/myboard/get.do', {params:{mnickname : mnickname}})
            .then((r)=>{
                console.log(r)
                setMyBoard(r.data);
            })
    },[])

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
                    {myBoard.map((r)=>{
                        console.log(r);
                        console.log(r.gname);
                        return(<>
                            <ul className='potoList' >
                            <li><img src={"/img/mimg/" +r.gname} className='gname'></img></li>
                            </ul>
                        </>)

                    })}
                </div>
            </div>
        </section>
    </>)
}