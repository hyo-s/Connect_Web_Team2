import './board.css';
export default function MainBoard(props){
    return(<>
        <section id="container">
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
                    <p>댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글</p>
                    <p><input type="text" /></p>
                    <button type='button'>등록</button>
                </div>

            </div>
        </section>
    
    </>)
}