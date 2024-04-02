import { useParams } from 'react-router-dom';
import './board.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SubBoard(props) {

    const {mnickname} = useParams();
    const [user, setUser] = useState({});
    const [mno, setMno] = useState();
    const [follower, setFollower] = useState();
    const [following, setFollowing] = useState();

    useEffect( ()=>{
        axios.get("/conn/m/page/get.do",{params:{'mnickname':mnickname}})
        .then(response=>{
            setUser(response.data);
            setMno(response.data.mno);
        })
        .catch(error=>{console.log(error)})

    },[])
    useEffect(()=>{
        axios.get("/conn/m/follower/get.do",{params:{'mno':mno}})
        .then(response=>{
            setFollower(response.data);
        })
        .catch(error=>{console.log(error)})
    },[mno])
    useEffect(()=>{
        axios.get("/conn/m/following/get.do",{params:{'mno':mno}})
        .then(response=>{
            setFollowing(response.data);
        })
        .catch(error=>{console.log(error)})
    },[mno])


    return(<>
        <section id="container">
            <div>
                <div className="myInfo">
                    <div className='imgBox'><img src={user.mimg} alt="" /></div>
                    <ul>
                    <li>{user.mname}</li>
                    <li>{user.mnickname}</li>
                    <li>{user.memail}</li>
                    <span>팔로우{following}명</span>
                    <span>팔로워{follower}명</span>
                    </ul>
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
            </div>
        </section>
    </>)
}