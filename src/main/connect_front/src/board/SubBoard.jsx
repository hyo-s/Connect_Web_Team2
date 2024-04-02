import '../css/board.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SubBoard(props) {

    const [myBoard, setMyBoard] = useState([]);

    useEffect(()=>{
        axios.get('/conn/b/myboard/get.do')
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
                        return(<>
                            <ul className='potoList'>
                            <li>{r.gname}</li>
                            </ul>
                        </>)

                    })}
                </div>
            </div>
        </section>
    </>)
}