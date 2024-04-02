package connectweb.connect_back.controller.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import connectweb.connect_back.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/conn/b")
@CrossOrigin("http://localhost:3000")
public class BoardController {

    @Autowired
    BoardService boardService;


    @PostMapping("/post.do")
    public int doPostBoard( BoardDto boardDto){
        System.out.println("boardDto = " + boardDto);
        return boardService.doPostBoard(boardDto);
    }

    @GetMapping("/get.do")
    public List<BoardDto> doGetBoard(){
        return boardService.doGetBoard();
    }

    @GetMapping("/myboard/get.do")
    public List<Map<Object,Object>> getMyBoardList(){
        return boardService.getMyBoardList();
    }

    @PutMapping("/put.do")
    public int doPutBoard(@RequestBody BoardDto boardDto){
        return boardService.doPutBoard(boardDto);
    }

    @DeleteMapping("/delete.do")
    public int doDeleteBoard(int bno){
        return boardService.doDeleteBoard(bno);
    }

    //=========================== 댓글 등록 ==========================//
    @PostMapping("/r/post.do")
    public boolean doPostReply(){
        return boardService.doPostReply();
    }
    //=========================== 댓글 출력 ==========================//
    @GetMapping("/r/get.do")
    public boolean doGetReply(){
        return boardService.doGetReply();
    }
    //=========================== 댓글 수정 ==========================//
    @PutMapping("/r/put.do")
    public boolean doPutReply(){
        return boardService.doPutReply();
    }
    //=========================== 댓글 삭제 ==========================//
    @DeleteMapping("/r/delete.do")
    public boolean doDeleteReply(){
        return boardService.doDeleteReply();
    }
}
