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
// ======================== [회원리스트] ======================== //
    @GetMapping("/list/get.do")
    public List<MemberDto> memberList (){
        return memberService.memberList();
    }
// ======================== [개인페이지 출력할 회원정보] ======================== //
    @GetMapping("/page/get.do")
    public MemberDto memberView (@RequestParam String mnickname){
        return memberService.memberView(mnickname);
    }
    @PutMapping("/mypage/put.do") // 회원수정
    public boolean memberUpdate (){
        return false;
    }

    @DeleteMapping("/mypage/put.do") // 회원삭제
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
