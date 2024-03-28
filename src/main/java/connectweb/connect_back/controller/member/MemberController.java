package connectweb.connect_back.controller.member;

import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.service.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conn/m")
@CrossOrigin("http://localhost:3000")
public class MemberController {
    @Autowired
    MemberService memberService;

    @PostMapping("/signup")// 회원가입
    public boolean SignupPost (@ModelAttribute MemberDto memberDto){
        System.out.println("memberDto = " + memberDto);
        return memberService.SignupPost(memberDto);
    }

    @GetMapping("/mView") // 회원출력
    public boolean memberView (){
        return false;
    }

    @GetMapping("/login") // 로그인
    public boolean loginGet (MemberDto memberDto){
        return memberService.loginGet(memberDto);
    }

    @PutMapping("/mUpdate") // 회원수정
    public boolean memberUpdate (){
        return false;
    }

    @DeleteMapping("/mDelete") // 회원삭제
    public boolean memberDelete (){
        return false;
    }

    @GetMapping("/check.id") // 아이디 중복검사
    public boolean checkId(String mid){
        System.out.println("mid = " + mid);
        return memberService.checkId(mid);
    }

    @GetMapping("/check.nickname") // 닉네임 중복검사
    public boolean checkNickName(String nickName){
        return memberService.checkNickName(nickName);
    }
    @GetMapping("/check.email") // 이메일 중복검사
    public boolean checkEmail(String email){
        return memberService.checkEmail(email);
    }
    @GetMapping("/check.phonenumber") // 전화번호 중복검사
    public boolean checkPhoneNumber(String phoneNumber){
        return memberService.checkPhoneNumber(phoneNumber);
    }
}
