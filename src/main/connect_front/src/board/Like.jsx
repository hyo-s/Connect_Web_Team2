import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { LoginInfoContext } from "../index/Index";

export default function Like(props){

    const {loginInfo} = useContext(LoginInfoContext);
    const [likeValue, setLikeValue] = useState('')

    useEffect(()=>{
        getLike();
    },[])

    const getLike = ()=>{
        axios.get("/conn/b/like/get.do", {params:{bno:props.bno}})
        .then(response=>{
            setLikeValue(response.data);
        })
        .catch(error=>{console.log(error)})
    }

    const onLikePost = ()=>{
        let likeData = new FormData();
        likeData.set("mno", loginInfo.mno);
        likeData.set("bno", props.bno);
        axios.post("/conn/b/like/post.do", likeData)
        .then(response =>{
            console.log(response);
            getLike();
        })
        .catch(error =>{console.log(error);})
    }

    return(<>
        <li><button onClick={onLikePost}>♥</button></li>
        <li>{likeValue}</li>
    </>)
}