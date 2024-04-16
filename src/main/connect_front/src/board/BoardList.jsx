import axios from "axios";
import { useEffect, useState } from "react";
import Reply from "./Reply";
import Carousel from "react-material-ui-carousel";
import Like from "./Like";
import { Link } from 'react-router-dom';

export default function BoardList(props) {
    const [boardList, setBoardList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect( ()=>{
        axios.get(`/conn/b/get.do?page=${page}&limit=5`)
            .then((response) => {
                if (!initialLoad) {
                    // 추가 데이터 로딩 시
                    setBoardList(prevBoardList => [...prevBoardList, ...response.data]);

                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    } , [ page ])

    console.log( page );
    useEffect(() => {
        const scrollDiv = document.getElementById('scroll');
        const handleScroll = () => {
            const scrollHeight = scrollDiv.scrollHeight;
            const scrollTop = scrollDiv.scrollTop;
            const clientHeight = scrollDiv.clientHeight;

            if ((scrollTop + clientHeight) >= (scrollHeight * 3 / 4)) {
                // 스크롤이 최하단에 도달하면 새로운 데이터를 불러옴
                setLoading(true);
                setPage(prevPage => prevPage + 1);
            }
        };

        // 초기 로딩 시에만 한 번 데이터를 가져옴
        if (initialLoad) {
            setLoading(true);
            axios.get(`/conn/b/get.do?page=${page}&limit=5`)
                .then((response) => {
                    setBoardList(response.data);
                    setLoading(false);
                    setInitialLoad(false);

                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        }

        scrollDiv.addEventListener('scroll', handleScroll);
        return () => {
            scrollDiv.removeEventListener('scroll', handleScroll);
        };
    }, [loading,  initialLoad]);
     
     return(<>
     <div id='scroll'>
         {
             boardList.map((board)=>{
                console.log(board.gnameList)
                 return(<>
                            <section id="container">
                                <div className="innerContainer">
                                    <div className="content mainContent">
                                        <div className="topInfo">
                                            <div className="topImg"> <img src={board.profilename} /> </div>
                                            <p><Link to={"/board/sub?mnickname="+board.mnickname}>{board.mnickname}</Link></p>
                                            <div>{board.cdate} </div>
                                        </div>
                                        <ul>
                                            <li>
                                                <Carousel sx={{ width: '100%', height:'370px'}} autoPlay={false}>
                                                 {
                                                    board.gnameList.map((img)=>{
                                                        return(<>
                                                            <img src={img} style={{width:"100%", height:350, objectFit:"cover"}}/>
                                                        </>)
                                                    })
                                                }
                                                </Carousel>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="btmBox">
                                        <ul>
                                            <Like bno={board.bno}/>
                                        </ul>
                                        <ul className="btmInfo">
                                            <li><Link to={"/board/sub?mnickname="+board.mnickname}>{board.mnickname}</Link></li>
                                            <li>{board.bcontent}</li>
                                        </ul>
                                    </div>
                                    <div className="replyBox" >

                                        <Reply board={board}/>
                                    </div>
                                </div>
                            </section>
                        </>
                 )
             })
         }
         </div>

     </>)
}
