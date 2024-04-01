package connectweb.connect_back.service.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.board.BoardEntityRepository;
import connectweb.connect_back.model.repository.board.GalleryEntityRepository;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import connectweb.connect_back.service.FileService;
import connectweb.connect_back.service.member.MemberService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BoardService {
    @Autowired
    BoardEntityRepository boardEntityRepository;

    @Autowired
    MemberEntityRepository memberEntityRepository;
    @Autowired
    GalleryEntityRepository galleryEntityRepository;
    @Autowired
    FileService fileService;
    @Autowired
    MemberService memberService;
    MemberDto loginDto = memberService.loginInfo();
    //로그인된 회원 엔티티찾기
    Optional<MemberEntity> optionalMemberEntity = memberEntityRepository.findById(loginDto.getMno());

    //게시물등록(0은 실패 1은 성공)
    @Transactional
    public int doPostBoard(BoardDto boardDto){
        //로그인 안됐으면 실패
        if (loginDto == null) return 0;

        //2. 찾은 엔티티가 존재하지 않으면 실패
        if(!optionalMemberEntity.isPresent()) return 0;
        //3. 멤버엔티티 꺼내기
        MemberEntity memberEntity = optionalMemberEntity.get();
        //글쓰기
        BoardEntity boardEntity = boardEntityRepository.save(boardDto.toEntity());

        boardEntity.setMemberEntity(memberEntity);
        System.out.println("boardDto = " + boardDto);

        //피드이미지----------------------------------------
        boardDto.getGfile().forEach((uploadFile)->{
            String fileName = fileService.FileUpload(uploadFile);

            GalleryEntity galleryEntity = GalleryEntity.builder()
                    .gname(fileName)
                    .boardEntity(boardEntity)
                    .build();

            galleryEntityRepository.save(galleryEntity);
            System.out.println("fileName = " + fileName);
            //------------------------------------------------
            ;
        });
        return 0;
    }


    @Transactional
    public List<BoardDto> doGetBoard(){
        List<BoardEntity> entityList = boardEntityRepository.findAll();
        List<BoardDto> boardDtoList = new ArrayList<>();
        entityList.forEach( (data)->{
            boardDtoList.add( data.toDto() );
        } );
        return boardDtoList;
    }

    public List<Map<Object,Object>> getMyBoardList(){
        //로그인 안됐으면 실패
        if (loginDto == null) return null;

        List<Map<Object,Object>> list = boardEntityRepository.findMyBoardList(loginDto.getMno());
        return list;

    }



    @Transactional
    public int doPutBoard(BoardDto boardDto){
        BoardEntity boardEntity = boardEntityRepository.findById(boardDto.getBno()).get();
        boardEntity.setBcontent("수정합니다.");
        return 0;
    }

    @Transactional
    public int doDeleteBoard(int bno){
        boardEntityRepository.deleteById(bno);
        return 0;
    }
}
