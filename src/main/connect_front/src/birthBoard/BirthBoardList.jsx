import axios from "axios";
import '../css/birthboard.css'
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

    <ul className="birthList" >

    {
        birthBoardList.map((birthboard)=>{
            return(<>

            </>)  // return 2
        })
    }
    </ul>
    </>) // return 1
}