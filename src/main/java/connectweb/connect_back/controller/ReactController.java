package connectweb.connect_back.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController {
    @GetMapping(value = {"/","/conn", "/member/signup", "/board/write","/board", "/member", "/birthboard/post", "/birthboard/get", "/board/sub/:mnickname", "/member/edit/:mnickname", "/birthboard/get", "/baord/submain", "/member/delete", "/board/update", "/chat"})
    public String reactForward(){
        return "forward:/index.html"; // 리액트 페이지
    }
}
