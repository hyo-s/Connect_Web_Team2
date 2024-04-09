package connectweb.connect_back.controller.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.dto.ReplyDto;
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
    @GetMapping("/img/get.do")
    public List<GalleryDto> dogetBoardImg(int bno){
        return boardService.dogetBoardImg(bno);
    }

    //개별피드출력
    @GetMapping("/myboard/get.do")
    public List<BoardDto> getMyBoardList(String mnickname){
        System.out.println("mnickname = " + mnickname);
        return boardService.getMyBoardList(mnickname);
    }

    //게시글수정
    @PutMapping("/put.do")
    public int doPutBoard(BoardDto boardDto){
        System.out.println("BoardController.doPutBoard");
        System.out.println("boardDto = " + boardDto);
        return boardService.doPutBoard(boardDto);
    }

    //게시물삭제
    @DeleteMapping("/delete.do")
    public boolean doDeleteBoard(int bno){
        System.out.println("bno = " + bno);
        System.out.println("BoardController.doDeleteBoard");
        return boardService.doDeleteBoard(bno);
    }

    //=========================== 댓글 등록 ==========================//
    @PostMapping("/r/post.do")
    public boolean doPostReply(ReplyDto replyDto){
        System.out.println("replyDto = " + replyDto);
        return boardService.doPostReply(replyDto);
    }
    //=========================== 댓글 출력 ==========================//
    @GetMapping("/r/get.do")
    public List<ReplyDto> doGetReply(int bno){
        return boardService.doGetReply(bno);
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
