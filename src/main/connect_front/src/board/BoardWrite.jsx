import { useState } from 'react';
import './board.css';
import axios from 'axios';
export default function BoardWrite(props){

    const [bcontent, setBcontent] = useState('');

    const onChangeBcontent = (e)=>{
        setBcontent(e.target.value)
    }
    
    const onSubmit = (e)=>{
        const contentForm = document.querySelector(".innerContainer");
        const contentFormData = new FormData(contentForm);
        console.log(contentFormData);

        contentFormData.set("bcontent", bcontent)

        axios.post("/conn/b/post.do", contentFormData)
        .then(response => {
            console.log(response);
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
                    <ul>
                        <li>이미지 미리보기</li>
                    </ul>
                </div>
                <div className="btmBox">
                    <input type="file" name="gfile" multiple/>
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