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

export default function Index(props){
    return(<>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<MainBoard/>}/>
                <Route path="/member/signup" element ={<SignUp/>}/>
                <Route path="/member/login" element ={<Login/>}/>
                <Route path={"/board/sub/:mnickname"} element={<SubBoard/>}/>
                <Route path="/board/write" element={<BoardWrite/>}/>
                <Route path="/board" element={<Board/>}/>
                <Route path="/member" element={<Member/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
           
    </>)
}