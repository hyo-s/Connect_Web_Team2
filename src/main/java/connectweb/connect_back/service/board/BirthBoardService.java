package connectweb.connect_back.service.board;

import connectweb.connect_back.model.dto.BirthBoardDto;
import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import connectweb.connect_back.model.entity.board.BirthBoardImgEntity;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.board.BirthBoardEntityRepository;
import connectweb.connect_back.model.repository.board.FileEntityRepository;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.FileService;
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
    @Autowired
    private FileService fileService;
    @Autowired
    private FileEntityRepository fileEntityRepository;

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

        // 1. 첨부 파일 처리
        // 첨부파일이 존재하면
        for(int i=0; i<birthBoardDto.getUploadList().size(); i++){
            String file = fileService.FileUpload3(birthBoardDto.getUploadList().get(i));
            fileEntityRepository.save(BirthBoardImgEntity.builder()
                    .bbimg(file)
                    .birthBoardEntity(saverBoard)
                    .build());
        }

        if(saverBoard.getBbno()>0)return true;
        return false;
    }

    // 전체출력
    @Transactional
    public List<BirthBoardDto> doGetBirthBoard(){
        List<Map<Object,Object>> listA=birthBoardEntityRepository.findAllBirthBoardSQL();
        List<BirthBoardDto> birthBoardDtoList = new ArrayList<>();

        listA.forEach((data)->{
            BirthBoardDto birthBoardDto = BirthBoardDto.builder()
                    .bbno((Integer)data.get("bbno"))
                    .bbcontent((String) data.get("bbcontent"))
                    .cdate((String) data.get("cdate"))  ////======================
                    .bimglist((List<String>) data.get("bimglist"))
                    .build();
            birthBoardDtoList.add(birthBoardDto);
            System.out.println("birthBoardDtoList = " + birthBoardDtoList);
        });
        return birthBoardDtoList;
    }

    // 개별출력
//    public List<BirthBoardDto> ViewBirthBoard(String mnickname){
//        List<Map<Object,Object>> list = birthBoardEntityRepository.findViewBirthBoardSQL(memberService.memberView(mnickname).getMno());
//        List<BirthBoardDto> birthDtoList = new ArrayList<>();
//        for(int i =0; i< list.size(); i++) {
//            Optional<BirthBoardEntity> birthBoardEntity = birthBoardEntityRepository.findById((Integer)list.get(i).get("bno"));
//            BirthBoardDto birthBoardDto = birthBoardEntity.get().birthDto();
//            birthDtoList.add(birthBoardDto);
//        }
//
//        return birthDtoList ;
//    }


}
