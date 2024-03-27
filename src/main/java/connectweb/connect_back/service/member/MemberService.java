package connectweb.connect_back.service.member;

import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    MemberEntityRepository memberEntityRepository;
    @Autowired
    FileService fileService;
    //로그인
    @Autowired private HttpServletRequest request;

    // 회원가입
    public boolean SignupPost (MemberDto memberDto){
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

    //로그인
    public boolean loginGet (MemberDto memberDto){

        return false;
    }
}
