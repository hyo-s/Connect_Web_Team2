package connectweb.connect_back.service.board;

import connectweb.connect_back.model.dto.BirthBoardDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.board.BirthBoardEntityRepository;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.member.MemberService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Service
public class BirthBoardService {
    @Autowired
    private MemberService memberService;
    @Autowired
    private BirthBoardEntityRepository birthBoardEntityRepository;
    @Autowired
    private MemberEntityRepository memberEntityRepository;
    // 1. 글쓰기
    @Transactional
    public boolean postBirthBoard(BirthBoardDto birthBoardDto){
//        MemberDto loginDto = memberService.loginInfo();
//        if(loginDto == null)
//            return false;
//
//            // 1. 로그인된 회원 엔티티 찾기
//            Optional<MemberEntity> optionalMemberEntity = memberEntityRepository.findById(loginDto.getMno());
//
//            // 2. 찾은 엔티티가 존재하지 않으면
//            if(!optionalMemberEntity.isPresent()) return false;
//
//            //3. 엔티티 꺼내기
//            MemberEntity memberEntity = optionalMemberEntity.get();

            // 글쓰기
        BirthBoardEntity saverBoard = birthBoardEntityRepository.save(birthBoardDto.birthEntity());
        if(saverBoard.getBbno()>0)return true;
        return false;
    }
    @Transactional
    public List<BirthBoardDto> doGetBirthBoard(){
        List<Map<Object,Object>> listA=birthBoardEntityRepository.findAllBirthBoardSQL();
        List<BirthBoardDto> birthBoardDtoList = new ArrayList<>();

        listA.forEach((data)->{
            BirthBoardDto birthBoardDto = BirthBoardDto.builder()
                    .bbno((Integer)data.get("bbno"))
                    .bbcontent((String) data.get("bbcontent"))
                    .cdate((String) data.get("cdate"))  ////======================
                    .build();
            birthBoardDtoList.add(birthBoardDto);
            System.out.println("birthBoardDtoList = " + birthBoardDtoList);
        });
        return birthBoardDtoList;
    }
}
