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

    // const {mnickname} = useParams();
    // const [user, setUser] = useState({});
    // const [mno, setMno] = useState();
    // const [follower, setFollower] = useState();
    // const [following, setFollowing] = useState();

    // useEffect( ()=>{
    //     axios.get("/conn/m/page/get.do",{params:{'mnickname':mnickname}})
    //     .then(response=>{
    //         setUser(response.data);
    //         setMno(response.data.mno);
    //     })
    //     .catch(error=>{console.log(error)})

    // },[])
    // useEffect(()=>{
    //     axios.get("/conn/m/follower/get.do",{params:{'mno':mno}})
    //     .then(response=>{
    //         setFollower(response.data);
    //     })
    //     .catch(error=>{console.log(error)})
    // },[mno])
    // useEffect(()=>{
    //     axios.get("/conn/m/following/get.do",{params:{'mno':mno}})
    //     .then(response=>{
    //         setFollowing(response.data);
    //     })
    //     .catch(error=>{console.log(error)})
    // },[mno])


    return(<>
        <section id="container">
            <div>
                {/* <div className="myInfo">
                    <div className='imgBox'><img src={user.mimg} alt="" /></div>
                    <ul>
                        <li>{user.mname}</li>
                        <li>{user.mnickname}</li>
                        <li>{user.memail}</li>
                    </ul>
                    <span>팔로우{following}명</span>
                    <span>팔로워{follower}명</span>
                </div> */}
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