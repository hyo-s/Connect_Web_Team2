package connectweb.connect_back.controller;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//
//@Controller
//public class ReactController {
//    @GetMapping(value = {"/","/conn", "/member/signup", "/board/write","/board", "/member", "/birthboard/post", "/birthboard/get", "/board/sub/:mnickname", "/member/edit/:mnickname", "/birthboard/get", "/baord/submain", "/member/delete", "/board/update", "/chat"})
//    public String reactForward(){
//        return "forward:/index.html"; // 리액트 페이지
//    }
//}

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // 스프링 컨테이너에 빈 등록 [ @Component ]
public class ReactController implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\w+}").setViewName("forward:/");
        registry.addViewController("/**/{spring:\\w+}").setViewName("forward:/");
        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}").setViewName("forward:/");
    }
}