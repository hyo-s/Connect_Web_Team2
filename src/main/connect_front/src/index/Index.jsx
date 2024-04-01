import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SignUp from "../member/SignUp";
import Login from "../member/Login";
import MainBoard from "../board/MainBoard";

export default function Index(props){
    return(<>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<MainBoard/>}/>
                <Route path="/member/signup" element ={<SignUp/>}/>
                <Route path="/member/login" element ={<Login/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
           
    </>)
}