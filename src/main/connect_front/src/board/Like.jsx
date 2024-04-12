import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { LoginInfoContext } from "../index/Index";

export default function Like(props){

    const {loginInfo} = useContext(LoginInfoContext);
    const [likeValue, setLikeValue] = useState('')
    const [likeOnOff, setLikeOnOff] = useState(false);

    useEffect(()=>{
        getLike();
        onLike();
    },[])

    const getLike = ()=>{
        axios.get("/conn/b/like/get.do", {params:{bno:props.bno}})
        .then(response=>{
            setLikeValue(response.data);
        })
        .catch(error=>{console.log(error)})
    }

    const onLike = ()=>{
        axios.get("/conn/b/like",{params:{mno:loginInfo.mno, bno:props.bno}})
        .then(response=>{
            console.log(response);
            setLikeOnOff(response.data);
        })
        .catch(error => {console.log(error)})
    }

    const onLikePost = ()=>{
        let likeData = new FormData();
        likeData.set("mno", loginInfo.mno);
        likeData.set("bno", props.bno);
        axios.post("/conn/b/like/post.do", likeData)
        .then(response =>{
            console.log(response);
            getLike();
            onLike();
        })
        .catch(error =>{console.log(error);})
    }

    const onLikeDelete = ()=>{
        axios.delete("/conn/b/like/delete.do", {params:{mno:loginInfo.mno, bno:props.bno}})
        .then(response=>{
            console.log(response)
            setLikeOnOff(false);
            getLike();
        })
        .catch(error=>{console.log(error)})
    }

    console.log(likeOnOff);

    return(<>
        <li>
            {likeOnOff?<button onClick={onLikeDelete}>♡</button>:<button onClick={onLikePost}>♥</button>} 
        </li>
        <li>{likeValue}</li>
    </>)
}