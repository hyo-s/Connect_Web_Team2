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
import Carousel from "react-material-ui-carousel";


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
        followChange : false,
        birthBoardList : []
    })
    const [bbcontent, setBbcontent] = useState('');

    const onChangeBbcontent = (e)=>{
        setBbcontent(e.target.value)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false); 

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
                const birthBoardListDataResponse = await axios.get('/birthboard/get.do')
                const birthBoardListData = birthBoardListDataResponse.data


                if(followData==""){
                    setProfileData({
                        user : userData,
                        loading : false,
                        follow : followData,
                        myBoard : boardData,
                        followChange : false,
                        birthBoardList : birthBoardListData
                    })
                }else{
                    setProfileData({
                        user : userData,
                        loading : false,
                        follow : followData,
                        myBoard : boardData,
                        followChange : true,
                        birthBoardList : birthBoardListData
                    })
                }

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

        navigate(`../board/submain/${board.bno}`, { state: { myBoard:profileData.myBoard, r: board , profilename : profileData.user.mimg}});
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
            .catch(error=>{
                console.log(error);
            })
        })
    }

    // 생일카드 쓰기
    const submit =()=>{
        const birthForm = document.querySelector("#birthForm");
        const birthFormData = new FormData(birthForm);
        birthFormData.set("mno", profileData.user.mno);
        console.log(birthFormData);

        axios.post("/birthboard/post.do", birthFormData)
        .then(r =>{
            console.log(r);
            if(r){
                alert("게시글 등록 성공")
            }else{
                alert("게시글 등록 실패")
            }
        })
        .catch(e=>{console.log(e)})
    }
    console.log(profileData)

    //채팅클릭
    const onChat = () =>{
        navigate('../chat',{state:{mnickname : profileData.user.mnickname}})
    }


    if (profileData.loading) {
        return <div>Loading...</div>
    }

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
                <Button style={{marginBottom : 10, marginTop : 10}} onClick={handleOpen}>생일카드쓰기</Button>
                <Button onClick={handleOpen2}>생일카드보기</Button>
                <div>
                    {loginInfo.mno === profileData.user.mno?(<></>):profileData.followChange?
                    <button type="button" onClick={()=>{onUnfollow(profileData.follow.fno)}}>언팔로우</button>:
                    <button type="button" onClick={onFollow}>팔로우</button>}
                </div>
                <Button onClick={()=>onChat()}>채팅</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >

                    <Box sx={style}>
                    <div className="cardLayout">
                           <Typography id="modal-modal-title" variant="h6" component="h2">
                                <form id="birthForm" className="innerContainer">
                                <h3 style={{margin : 0}}>생일카드</h3>
                                <textarea value={bbcontent} onChange={onChangeBbcontent} name="bbcontent" cols="42" rows="12"></textarea>
                                <div className="cardFileBox">
                                        <input type="file" name="uploadList" multiple accept='image/*' />
                                    </div>
                                <button className="CardBtn" type="button" onClick={submit}>등록</button>
                                </form>
                          </Typography>
                    </div>
                    </Box>

                </Modal>

                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >

                        <Box sx={style}>
                        <Carousel  sx={{ width: '100%', height: '300px' }}  autoPlay={false}>
                        {
                            profileData.birthBoardList.map((birthboard)=>{
                                console.log(birthboard.bimglist)
                                return(<>
                                        <button type="button">삭제</button>
                                        <div style={{ backgroundImage: `url(/img/birthboardimg/${birthboard.bbimg})`, height: '300px', backgroundRepeat:'no-repeat',  backgroundPosition: 'bottom', backgroundSize:'cover'}}>{birthboard.bbcontent}</div>

                                </>)  // return 2

                            })
                        }
                         </Carousel>
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