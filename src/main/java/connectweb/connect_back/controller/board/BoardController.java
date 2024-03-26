package connectweb.connect_back.controller.board;

import connectweb.connect_back.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/conn/b")
@CrossOrigin("http://localhost:3000")
public class BoardController {
    //장혜란 최초커밋
    @Autowired
    BoardService boardService;
}
