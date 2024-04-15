import { useState } from 'react';
import '../css/board.css'
import axios from 'axios';
import Carousel from "react-material-ui-carousel";
import { useLocation, useNavigate } from 'react-router-dom';


export default function BoardUpdate(props){

    const nav = useNavigate();

    const location = useLocation();
    console.log(location.state.board);


    const [board, setBoard] = useState({
        bno : location.state.board.bno,
        bcontent : location.state.board.bcontent,
        gnameList : location.state.board.gnameList
    });

    const {bno, bcontent, gnameList} = board;
    console.log(board);

    const [imgPre, setImgPre] = useState({
        board : board.gnameList,
    });
    console.log(imgPre);

 
    // let boardArray = Array.from(location.state.board.gnameList);
    // console.log(boardArray);

    const onChangeBcontent = (e)=>{
        setBoard({bno:location.state.board.bno,bcontent:e.target.value})
        console.log(e.target.value);
    }

    const onChangeImg = (e) =>{
        console.log(e);
        console.log(e.target.files);
        const imgArray = Array.from(e.target.files);
        console.log(imgArray);
        imgArray.forEach((i) => {
            console.log(i)
            imgPre.board.push(URL.createObjectURL(i));
            console.log(imgPre);
        });
        setImgPre({...imgPre});
        console.log(imgPre);
    }

    
    
    const onSubmit = (e)=>{
        console.log(board);
        const contentForm = document.querySelector(".innerContainer");
        const contentFormData = new FormData(contentForm);
        const bno = board.bno

        contentFormData.set("bno",board.bno)
        contentFormData.set("bcontent",board.bcontent)

        console.log(board.bno); 

        axios.put("/conn/b/put.do", contentFormData)
        .then(response => {
            console.log(response);
            if(response.data == 0){
                alert('수정성공')
                window.location.href = "/board/sub/"+location.state.board.mnickname
                //nav(-1)//뒤로가기
            }else if(response.data == 1){
                alert('사진없음')
            }else if(response.data == 2){
                alert('수정실패')
            }
        })
        .catch(error => {console.log(error)})
    }
    
    const imgDelete = (e, i)=>{
        console.log(i);
        console.log(imgPre.board);
        axios.delete("/conn/b/imgdelete.do",{params:{gname:i}})
        .then(r=>{
            console.log(r);
            if(r.data){                
                board.gnameList.splice(board.gnameList.indexOf(i),1)
                setBoard({...board})                
            }else(
                alert("삭제실패")
            )
        })

    }


    return(<>
        <section id="container">
            <form className="innerContainer">
                <div className="header">
                    HEADER
                    <button type="button" onClick={onSubmit}>수정</button>
                </div>
                <div className="content mainContent">
                <Carousel autoPlay={false}>
                {imgPre.board.length!=0 &&
                    imgPre.board.map((i)=>{
                        console.log(i);
                        return(<>
                            <img src={i.indexOf("http")<=0?"/img/boardimg/"+i:i} value={gnameList} style={{width:"100%", height:400, objectFit:"cover"}}/>
                            {
                                i.indexOf("http")<=0 &&
                                <button style={{marginLeft: 195}}type='button' onClick={(e)=>imgDelete(e, i)} >삭제</button>
                            }
                            
                        </>)
                    })
                }
                </Carousel>
                </div>
                

                
                <div className="btmBox">
                    <input type="file" name="gfile" multiple onChange={(e)=>onChangeImg(e)}  accept='image/*' />
                </div>
                <div className="btmBox">
                    <textarea value={bcontent} onChange={onChangeBcontent}></textarea>
                </div>
                <div className="footer">
                    FOOTER
                </div>
            </form>
        </section>
    </>)
}