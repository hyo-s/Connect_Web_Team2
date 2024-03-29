package connectweb.connect_back.service.member;

import connectweb.connect_back.model.dto.LoginDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    @Autowired
    MemberEntityRepository memberEntityRepository;
    @Autowired
    FileService fileService;
    //로그인
    @Autowired private HttpServletRequest request;

// ========================= [ 현재 로그인 정보 호출 ] ========================= //
    public MemberDto loginInfo(){
        Object object = request.getSession().getAttribute("loginInfo");
        if (object != null){
            return (MemberDto)object;
        }
        return null;
    }
// ========================= [ 로그인 된 회원 Entity 호출] ========================= //
    public MemberEntity loginEntity(){
        MemberDto loginDto = loginInfo();
        if(loginDto==null) return null;
        Optional<MemberEntity> optionalMemberEntity = memberEntityRepository.findById(loginDto.getMno());
        if(!optionalMemberEntity.isPresent()) return null;
        MemberEntity memberEntity = optionalMemberEntity.get();
        System.out.println("memberEntity = " + memberEntity);
        return memberEntity;
    }
// ========================= [회원가입] ========================= //
    public boolean signUpPost (MemberDto memberDto){
        System.out.println("memberDto = " + memberDto);

        //프로필 파일 처리
        String fileName="";
        System.out.println("employeeDto.getMfile() = " + memberDto.getMfile());
        if(!memberDto.getMfile().isEmpty()) {
            fileName = fileService.FileUpload(memberDto.getMfile());
            if (fileName == null) { // 업로드 성공했으면
                return false;
            }
        }
        //dto에 업로드 성공한 파일명을 대입한다
        memberDto.setMimg(fileName);

        //-- Dao 안니 엔티티 이용한 레코드 저장하는 방법
        //1. 엔티티를 만든다
        //2. 리포지토리 통한 엔티티를 저장한다
        memberEntityRepository.save(memberDto.toEntity());
        return false;
    }
// ========================= [로그인] ========================= //
    public boolean loginPost (LoginDto loginDto){
        MemberEntity loginConfirm = memberEntityRepository.findByLoginSQL(loginDto.getMid(), loginDto.getMpw());
        if(loginConfirm == null)return false;
        request.getSession().setAttribute("loginInfo", loginConfirm.toDto());
        return true;
    }
// ========================= [로그아웃] ========================= //
    public boolean doLogOutGet(){
        request.getSession().setAttribute("loginInfo",null);
        return true;
    }
// ========================= [아이디, 닉네임, 이메일, 전화번호 중복검사] ========================= //
    public boolean checkId(String mid){
        boolean result = memberEntityRepository.existsByMid(mid);
        return result;
    }
    public boolean checkNickName(String nickName){
        boolean result = memberEntityRepository.existsByMnickname(nickName);
        return result;
    }
    public boolean checkEmail(String email){
        boolean result = memberEntityRepository.existsByMemail(email);
        return result;
    }
    public boolean checkPhoneNumber(String phoneNumber){
        boolean result = memberEntityRepository.existsByMphone(phoneNumber);
        return result;
    }
}
