import styles from './Board.css';

export default function SubBoard(props) {
    return(<>
        <section id="container">
            <div className='header'>HEADER</div>
            <div className="myInfo">
                <div className='imgBox'><img src="" alt="" /></div>
                <ul>
                   <li>name</li>
                   <li>정보</li>
                   <button>팔로우</button>
                   <button>팔로워</button>
                </ul>
            </div>
            <div className="content subContent">
                <ul className='potoList'>
                    <li>img1</li>
                    <li>img2</li>
                    <li>img3</li>
                </ul>
                <ul className='potoList'>
                    <li>img1</li>
                    <li>img2</li>
                    <li>img3</li>
                </ul>
                <ul className='potoList'>
                    <li>img1</li>
                    <li>img2</li>
                    <li>img3</li>
                </ul>
            </div>
            <div className='footer'>FOOTER</div>
        </section>
    </>)
}