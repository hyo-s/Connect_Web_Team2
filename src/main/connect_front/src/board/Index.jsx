import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

export default function Index(props){
    return(<>
        <BrowserRouter>
            <Header/>
            <Routes>
              
            </Routes>
            <Footer/>
        </BrowserRouter>
           
    </>)
}