package connectweb.connect_back.controller.member;

import connectweb.connect_back.service.board.BoardService;
import connectweb.connect_back.service.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/conn")
public class MemberController {
    @Autowired
    MemberService memberService;
}
