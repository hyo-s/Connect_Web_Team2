import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SignUp from "../member/SignUp";
import Login from "../member/Login";
import MainBoard from "../board/MainBoard";
import SubBoard from "../board/SubBoard";
import BoardWrite from "../board/BoardWrite";
import Board from "../board/Board";
import Member from "../member/Member";
import BirthBoardWrite from "../birthBoard/BirthBoardWrite";
import Profile from "../member/Profile";
import React, { useState } from "react";
import Edit from "../member/Edit";
import Delete from "../member/Delete";
import SubBoardMain from "../board/SubBoardMain";

export const LoginInfoContext = React.createContext('');

export default function Index(props){
    const [loginInfo, setLoginInfo] = useState('');
    return(<>
    <LoginInfoContext.Provider value={{loginInfo, setLoginInfo}}>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<MainBoard/>}/>
                <Route path="/member/signup" element ={<SignUp/>}/>
                <Route path="/member/login" element ={<Login/>}/>
                <Route path="/board/sub/:mnickname" element={<SubBoard/>}/>
                <Route path="/board/write" element={<BoardWrite/>}/>
                <Route path="/board" element={<Board/>}/>
                <Route path="/member" element={<Member/>}/>
                <Route path="/birthboard/post" element={<BirthBoardWrite/>}/>
                <Route path={"/board/sub/:mnickname"} element={<Profile/>}/>
                <Route path={"/member/edit"} element={<Edit/>}/>
                {/* <Route path={"/member/delete"} element={<Delete/>}/> */}
                <Route path={"/baord/submain/:mnickname"} element={<SubBoardMain/>}/>
                <Route path={"/member/edit/:mnickname"} element={<Edit/>}/>
                <Route path="/member/delete" element={<Delete/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </LoginInfoContext.Provider>

    </>)
}