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


    //게시물등록(0은 실패 1은 성공)
    @Transactional
    public int doPostBoard(BoardDto boardDto){

        MemberEntity memberEntity = memberService.loginEntity();


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

        List<Map<Object,Object>> list = boardEntityRepository.findMyBoardList(memberService.loginEntity().getMno());
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
