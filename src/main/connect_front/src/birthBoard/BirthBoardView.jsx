import axios from 'axios';
import { useEffect, useState } from "react"

export default function BirthBoardView(props){

    const[birthBoardView,setBirthBoardView] = useState([]);

    useEffect(()=>{

        axios.get('/birthboard/view.do', {params:{mnickname : mnickname}})
            .then((r)=>{
                console.log(r)
                setBirthBoardView(r.data);
            })
    },[])

    const onClickView = (view) => {
        console.log(view)

        
    }

    return(<>
        <button type='button'>생일카드</button>
    </>)
}