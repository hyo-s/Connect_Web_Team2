import { useState } from 'react';
import '../css/board.css'
import axios from 'axios';
import Carousel from "react-material-ui-carousel";
import { useLocation } from 'react-router-dom';


export default function BoardUpdate(props){

    const location = useLocation();
    console.log(location.state.board);


    const [bcontent, setBcontent] = useState(
        {bcontent:location.state.board.bcontent}
    );
    const [imgPre, setImgPre] = useState([]);

 
    let boardArray = Array.from(location.state.board.gnameList);
    console.log(boardArray);

    const onChangeBcontent = (e)=>{
        setBcontent(e.target.value)

    }

    const onChangeImg = (e) =>{
        console.log(e);
        console.log(e.target.files);
        const imgArray = Array.from(e.target.files);
        console.log(imgArray)
        let imgPre = [];
        imgArray.forEach((i) => {
            console.log(i)
            imgPre.push(URL.createObjectURL(i));
            console.log(imgPre);
        });
        setImgPre(imgPre);
        console.log(imgPre);
    }

    
    
    const onSubmit = (e)=>{
        const contentForm = document.querySelector(".innerContainer");
        const contentFormData = new FormData(contentForm);
        console.log(contentFormData);

        contentFormData.set("bcontent", bcontent)       

        axios.put("/conn/b/put.do", contentFormData)
        .then(response => {
            console.log(response);
            if(response.data == 1){
                alert('등록성공')
                //window.location.href = '/board/myboard'
            }else if(response.data == 2){
                alert('등록실패')
            }
        })
        .catch(error => {console.log(error)})
    }
    return(<>
        <section id="container">
            <form className="innerContainer">
                <div className="header">
                    HEADER
                    <button type="button" onClick={onSubmit}>쓰기</button>
                </div>
                <div className="content mainContent">
                <Carousel>                
                {
                    boardArray.length!=0 &&
                    boardArray.map((i)=>{
                        return(<>
                            <img src={i} style={{width:"100%", height:400, objectFit:"cover"}}/>
                        </>)
                    })
                }
                                
                           
                </Carousel>
                </div>
                

                
                <div className="btmBox">
                    <input type="file" name="gfile" multiple onChange={(e)=>onChangeImg(e)}  accept='image/*' />
                </div>
                <div className="btmBox">
                    <textarea value={location.state.board.bcontent} onChange={onChangeBcontent}></textarea>
                </div>
                <div className="footer">
                    FOOTER
                </div>
            </form>
        </section>
    </>)
}