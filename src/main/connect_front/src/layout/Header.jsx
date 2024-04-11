import * as React from 'react';
import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginInfoContext } from "../index/Index";
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/joy/Button';

export default function Header(props){

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };


    const {loginInfo, setLoginInfo } = useContext(LoginInfoContext);

    console.log(loginInfo);

    useEffect(()=>{
        axios.get("/conn/m/login/info/get.do")
        .then(response=>{
            console.log(response);
            setLoginInfo(response.data)
        })
        .catch(error=>{console.log(error)})
    },[])

    if(window.location.pathname === "/"){
        return null;
    }
    if(window.location.pathname === "/member/signup"){
        return null;
    }

    return(<>
        <div className="header">
            <div className="headerImg">
                <Link to="/conn"><img src="/img/connect_logo.png"/></Link>
            </div>
            <div>
                <Input startDecorator={<SearchIcon />} endDecorator={<Button>Search</Button>}/>
            </div>
            <div>
                <div className="headerProfile">
                    <div>
                        <Link to='#'>
                            <SendIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="header">
            <ul>
                <li><Link to="/member">멤버</Link></li>
            </ul>
        </div>
    </>)
}