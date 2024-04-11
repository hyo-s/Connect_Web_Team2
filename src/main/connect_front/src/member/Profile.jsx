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
import styles from "../css/board.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function Profile(){

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        height : 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const {loginInfo} = useContext(LoginInfoContext);
    const {mnickname} = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [myBoard, setMyBoard] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <Button onClick={handleOpen}>생일카드</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        생일축하카드
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                        </Typography>
                    </Box>
                </Modal>
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