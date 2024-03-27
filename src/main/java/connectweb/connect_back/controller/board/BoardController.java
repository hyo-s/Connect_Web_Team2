package connectweb.connect_back.controller.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conn/b")
@CrossOrigin("http://localhost:3000")
public class BoardController {

    @Autowired
    BoardService boardService;

    @PostMapping("/post.do")
    public int doPostBoard(@RequestBody BoardDto boardDto){
        System.out.println("boardDto = " + boardDto);
        return boardService.doPostBoard(boardDto);
    }

    @GetMapping("/get.do")
    public List<BoardDto> doGetBoard(){
        return boardService.doGetBoard();
    }

    @PutMapping("/put.do")
    public int doPutBoard(@RequestBody BoardDto boardDto){
        return boardService.doPutBoard(boardDto);
    }

    @DeleteMapping("/delete.do")
    public int doDeleteBoard(int bno){
        return boardService.doDeleteBoard(bno);
    }
}
