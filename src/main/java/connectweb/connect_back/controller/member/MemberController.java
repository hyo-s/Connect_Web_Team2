package connectweb.connect_back.controller.member;

import connectweb.connect_back.service.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/conn/m")
@CrossOrigin("http://localhost:3000")
public class MemberController {
    @Autowired
    MemberService memberService;
}
