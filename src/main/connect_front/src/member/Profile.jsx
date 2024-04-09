import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { LoginInfoContext } from "../index/Index";
import { useNavigate} from "react-router-dom";
import '../css/birthboard.css'
import Button from '@mui/joy/Button';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Stack from '@mui/material/Stack';


export default function Profile(){
    const {loginInfo} = useContext(LoginInfoContext);
    const {mnickname} = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [myBoard, setMyBoard] = useState([]);
    
    const navigate = useNavigate();

    const isLinkDisabled = loginInfo === '';

    useEffect( ()=>{
        const getMember = async ()=>{
            await axios.get("/conn/m/page/get.do",{params:{'mnickname':mnickname}})
            .then(response=>{
                console.log(response)
                setUser(response.data);
                setLoading(false);
            })
            .catch(error=>{
                console.log(error);
                setLoading(false);
            })
        } 
        getMember();
    }, [mnickname])

    useEffect(()=>{

        axios.get('/conn/b/myboard/get.do', {params:{mnickname : mnickname}})
            .then((r)=>{
                console.log(r)
                setMyBoard(r.data);
            })
    },[])   

    const onClickImg = (myBoard,r) =>{
        console.log(myBoard)
        navigate('../baord/submain',{state:{myBoard:myBoard, r:r}})
    }


    if (loading) {
        return <div>Loading...</div>
    }

    console.log(loginInfo);
    console.log(user);
    return(<>
        <section id="container">
            <div>
                <div className="myInfo">
                <div>
                <div className='imgBox'>
                    <img src={user.mimg != 'default.png' ? "/img/mimg/"+user.mimg : "/img/mimg/default.png"} alt="" />
                </div>
                <ul>
                    <li>{user.mname}</li>
                    <li>{user.mnickname}</li>
                    <li>{user.memail}</li>
                </ul>
                <span>팔로우{user.tofollow}명</span>    
                <span>팔로워{user.fromfollow}명</span>
            </div>
            <div>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<PersonOffIcon />}>
                        Unfollow
                    </Button>
                    <Button variant="contained" endIcon={<PersonAddIcon />}>
                        follow
                    </Button>
                </Stack>
            </div>
            <div>
                {isLinkDisabled?(<></>):loginInfo.mno === user.mno?(<Link to={"/member/edit/"+loginInfo.mnickname}>수정</Link>):(<></>)}
            </div>
                </div>
                <div className="content subContent">
                <ul className='potoList' >
                    {myBoard.map((r)=>{ 
                        console.log(r);
                        console.log(r.bno);
                        return(<>                           
                                <li><img src={"/img/boardimg/" +r.gnameList[0]} className='gnameList' onClick={()=>onClickImg({myBoard,r})}></img></li>                  
                            
                        </>)
                    })}
                </ul>
                </div>
            </div>
        </section>
    </>)
}