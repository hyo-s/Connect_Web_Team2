import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { LoginInfoContext } from "../index/Index";
import { useNavigate} from "react-router-dom";
import '../css/birthboard.css'
import Button from '@mui/joy/Button';
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

    const [profileData, setProfileData] = useState({
        user : {},
        loading : true,
        follow : {},
        myBoard : [],
        followChange : false
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const isLinkDisabled = loginInfo === '';

    useEffect(()=>{
        const data = async ()=>{
            try{
                const userDataResponse = await axios.get("/conn/m/page/get.do",{params:{mnickname:mnickname}});
                const userData = userDataResponse.data;
                const boardDataResponse = await axios.get('/conn/b/myboard/get.do', {params:{mnickname : mnickname}});
                const boardData = boardDataResponse.data;
                const followDataResponse = await axios.get("/conn/m/follow/get.do", {params:{tofollow : userData.mno}});
                const followData = followDataResponse.data;


                if(followData==""){
                    setProfileData({
                        user : userData,
                        loading : false,
                        follow : followData,
                        myBoard : boardData,
                        followChange : false
                    })
                }else{
                    setProfileData({
                        user : userData,
                        loading : false,
                        follow : followData,
                        myBoard : boardData,
                        followChange : true
                    })
                }
                // setProfileData({
                //     user : userData,
                //     loading : false,
                //     follow : followData,
                //     myBoard : boardData,
                //     followChange : false
                // })
            
            }catch(error){
                console.log(error)
                setProfileData(prevState =>({
                    ...prevState,
                    loading:false
                }));
            }
        }
        data();
    },[mnickname,profileData.followChange])

    const onClickImg = (board) => {
        navigate(`../baord/submain`, { state: { myBoard:profileData.myBoard, r: board } });
    };

    if (profileData.loading) {
        return <div>Loading...</div>
    }

    const onFollow = (e)=>{
        axios.post('/conn/m/follow/post.do', {tofollow : profileData.user.mno})
        .then(respnse =>{
            console.log(respnse);
            setProfileData({
                ...profileData,
                followChange : true
            })
        })
        .catch(error => {console.log(error)})
    }

    const onUnfollow = (fno)=>{
        axios.delete('/conn/m/follow/delete.do', {params:{fno:fno}})
        .then(response=>{
            console.log(response);
            setProfileData({
                ...profileData,
                followChange : false
            })
        })
        .catch(error=>console.log(error))
    }
 
    console.log(loginInfo);
    console.log(profileData);
    return(<>
        <section id="container">
            <div>
                <div className="myInfo">
                <div>
                <div className='imgBox'>
                    <img src={profileData.user.mimg != 'default.png' ? "/img/mimg/"+profileData.user.mimg : "/img/mimg/default.png"} alt="" />
                </div>
                <ul>
                    <li>{profileData.user.mname}</li>
                    <li>{profileData.user.mnickname}</li>
                    <li>{profileData.user.memail}</li>
                </ul>
                <span>팔로우{profileData.user.tofollow}명</span>
                <span>팔로워{profileData.user.fromfollow}명</span>
            </div>
            <div>
                <div>
                    {loginInfo.mno === profileData.user.mno?(<></>):profileData.followChange?
                    <button type="button" onClick={()=>{onUnfollow(profileData.follow.fno)}}>언팔로우</button>:
                    <button type="button" onClick={onFollow}>팔로우</button>}
                </div>
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
                {isLinkDisabled?(<></>):loginInfo.mno === profileData.user.mno?(<Link to={"/member/edit/"+loginInfo.mnickname}>수정</Link>):(<></>)}
            </div>
                </div>
                <div className="content subContent">
                <ul className='potoList' >
                    {profileData.myBoard.map((board,index)=>{ 
                        return(<>                           
                                <li key={index}>
                                    <img src={"/img/boardimg/" +board.gnameList[0]} className='gnameList' onClick={()=>onClickImg(board)}/>
                                </li>
                        </>)
                    })}
                </ul>
                </div>
            </div>
        </section>
    </>)
}