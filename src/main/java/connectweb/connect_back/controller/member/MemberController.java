package connectweb.connect_back.controller.member;

import connectweb.connect_back.model.dto.FollowDto;
import connectweb.connect_back.model.dto.LoginDto;
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

// ========================= [ 현재 로그인 정보 호출 ] ========================= //
    @GetMapping("/login/info/get.do")
    public MemberDto loginInfo(){
        return memberService.loginInfo();
    }

// ========================= [회원가입] ========================= //
    @PostMapping("/signup.do")// 회원가입
    public boolean signUpPost (@ModelAttribute MemberDto memberDto){
        return memberService.signUpPost(memberDto);
    }

// ========================= [로그인] ========================= //
    @PostMapping("/login.do") // 로그인
    public boolean loginPost (LoginDto loginDto){
        return memberService.loginPost(loginDto);
    }

// ======================== [로그아웃] ======================== //
    @GetMapping("/logout/get.do")
    public boolean doLogOutGet(){
        return memberService.doLogOutGet();
    }


    @GetMapping("/mview") // 회원출력
    public boolean memberView (){
        return false;
    }

    @PutMapping("/mUpdate") // 회원수정
    public boolean memberUpdate (){
        return false;
    }

    @DeleteMapping("/mDelete") // 회원삭제
    public boolean memberDelete (){
        return false;
    }

// ========================= [아이디, 닉네임, 이메일, 전화번호 중복검사] ========================= //
    @GetMapping("/check.id")
    public boolean checkId(String mid){
        return memberService.checkId(mid);
    }
    @GetMapping("/check.nickname")
    public boolean checkNickName(String nickName){
        return memberService.checkNickName(nickName);
    }
    @GetMapping("/check.email")
    public boolean checkEmail(String email){
        return memberService.checkEmail(email);
    }
    @GetMapping("/check.phonenumber")
    public boolean checkPhoneNumber(String phoneNumber){
        return memberService.checkPhoneNumber(phoneNumber);
    }
}
