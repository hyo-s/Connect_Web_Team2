import '../css/board.css';
import axios from 'axios';
import BoardList from './BoardList.jsx';

export default function MainBoard(props){


    return(
        <div id='scroll'>
            <BoardList />
        </div>
        )
}