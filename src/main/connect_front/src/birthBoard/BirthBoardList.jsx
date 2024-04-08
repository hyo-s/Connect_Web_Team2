import axios from "axios";
import { useEffect, useState } from "react"

export default function BirthBoardList(){


    // 1. useState 
    const [birthBoardList, setBirthBoardList] = useState([]);

    console.log(birthBoardList); 

    useEffect(()=>{
        axios.get('/birthboard/get.do')
        .then((r)=>{
            console.log(r);
            setBirthBoardList(r.data);
        })
        .catch(e=>{console.log(e)})
    },[])
    

    return(<>
    {
        birthBoardList.map((birthboard)=>{
            return(<>
                <section id="container">
                    <div className="innerContainer">
                        <div>
                            <ul>
                                <li>작성내용 :{birthboard.bbcontent}</li>
                                <li>작성날짜 :{birthboard.cdate}</li>
                                
                            </ul>
                        </div>
                    </div>
                </section>
            </>)  // return 2
        })
    }
    </>) // return 1
}