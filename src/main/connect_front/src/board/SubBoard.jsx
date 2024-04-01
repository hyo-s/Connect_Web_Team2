import { useEffect, useState } from 'react';
import './board.css';
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
            <div className='header'>HEADER</div>
            <div className="myInfo">
                <div className='imgBox'><img src="" alt="" /></div>
                <ul>
                   <li>name</li>
                   <li>정보</li>
                   <button>팔로우</button>
                   <button>팔로워</button>
                </ul>
            </div>
            <div>
            {myBoard.map((r)=>{
                console.log(r)
            })}
            </div>
            <div className="content subContent">
                
                <ul className='potoList'>
                    <li>img1</li>
                    <li>img2</li>
                    <li>img3</li>
                </ul>
                <ul className='potoList'>
                    <li>img1</li>
                    <li>img2</li>
                    <li>img3</li>
                </ul>
                <ul className='potoList'>
                    <li>img1</li>
                    <li>img2</li>
                    <li>img3</li>
                </ul>
            </div>
            <div className='footer'>FOOTER</div>
        </section>
    </>)
}