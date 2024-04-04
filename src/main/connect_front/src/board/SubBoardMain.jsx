import '../css/board.css';
import axios from 'axios';
import Reply from './Reply.jsx';
import BoardList from './BoardList.jsx';

export default function MainBoard(props){


    //axios.get('/conn/b/get.do')


    return(<>
                <BoardList />
        {/* <section id="container">
            <div className="innerContainer">
                
                <div className="content mainContent">
                    <div className="topInfo">
                        <div className="topImg"></div>
                        <p>아이디</p>
                    </div>
                    <ul>
                        <li>img1</li>
                    </ul>
                </div>
                <div className="btmBox">
                    <ul>
                        <li>♥</li>
                    </ul>
                    <ul className="btmInfo">
                        <li><a href="#">ksa</a></li>
                        <li>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</li>
                    </ul>
                </div>
                <div className="replyBox">
                    <Reply />
                </div>

            </div>
        </section> */}
    
    </>)
}