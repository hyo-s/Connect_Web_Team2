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
                                <li>작성내용 : 하이루방가방{birthboard.bbcontent}</li>
                                <li>작성날짜 : 1997.10.07{birthboard.cdate}</li>
                                <li>받는사람 : 리민형{}</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </>)  // return 2
        })
    }
    </>) // return 1
}