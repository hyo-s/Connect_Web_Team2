package connectweb.connect_back.controller.board;

import connectweb.connect_back.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/conn")
public class BoardController {
    //장혜란 최초커밋
    @Autowired
    BoardService boardService;
}
