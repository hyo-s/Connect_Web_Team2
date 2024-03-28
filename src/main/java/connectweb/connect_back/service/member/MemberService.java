package connectweb.connect_back.service.member;

import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

        //1. 리포지토리를 통한 모든 회원엔티티 호출
        List<MemberEntity> memberEntityList= memberEntityRepository.findAll();

        //2. dto와 동일한 아이디/패스워드 찾는다
        for(int i=0; i<memberEntityList.size(); i++){
            MemberEntity m=memberEntityList.get(i);
            //3. 만약에 아이디가 동일하면(엔티티와 dto)
            if(m.getMemail().equals(memberDto.getMemail())){
                //4. 만약에 비밀번호가 동일하면
                if(m.getMpw().equals((memberDto.getMpw()))){
                    //5. 세션 저장
                    request.getSession().setAttribute("loginInfo",memberDto);
                    return true;
                }
            }
        }
        return false;
    }
}
