package connectweb.connect_back.service.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.dto.GalleryDto;
import connectweb.connect_back.model.dto.MemberDto;
import connectweb.connect_back.model.dto.ReplyDto;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import connectweb.connect_back.model.entity.board.ReplyEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.board.BoardEntityRepository;
import connectweb.connect_back.model.repository.board.GalleryEntityRepository;
import connectweb.connect_back.model.repository.board.ReplyEntityRepository;
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
import java.util.stream.Collectors;

@Service
public class BoardService {
    @Autowired
    BoardEntityRepository boardEntityRepository;

    @Autowired
    MemberEntityRepository memberEntityRepository;
    @Autowired
    GalleryEntityRepository galleryEntityRepository;
    @Autowired
    ReplyEntityRepository replyEntityRepository;
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
            String fileName = fileService.FileUpload2(uploadFile);

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

    // 전체 게시글 출력 ///
    @Transactional
    public List<BoardDto> doGetBoard(){
        List<Map<Object,Object>> list1=boardEntityRepository.findAllBoardSQL();
        List<BoardDto> boardDtoList=new ArrayList<>();
        list1.forEach((data)->{
            BoardDto boardDto=BoardDto.builder()
                    .bno((Integer)data.get("bno"))
                    .bcontent((String) data.get("bcontent"))
                    .mnickname((String)data.get("mnickname"))
                    .build();
            boardDtoList.add(boardDto);
        });
        return boardDtoList;
       /* return boardEntityRepository.findAll().stream().map(((boardEntity)->{
            return boardEntity.toDto();
        })).collect(Collectors.toList());*/
        /*List<BoardEntity> entityList = boardEntityRepository.findAll();
        List<BoardDto> boardDtoList = new ArrayList<>();
        entityList.forEach( (data)->{
            boardDtoList.add( data.toDto() );
        } );
        return boardDtoList;*/


    }

    //개별출력
    public List<GalleryDto> getMyBoardList(String mnickname){
        List<Map<Object,Object>> list = boardEntityRepository.findMyBoardList(memberService.memberView(mnickname).getMno());
        List<GalleryDto> galleryDtoList = new ArrayList<>();
        System.out.println("list = " + list);
        for(int i = 0; i< list.size();i++){
            Object object = list.get(i).get("bno");
            List<Map<Object,Object>> list1 = boardEntityRepository.findBno(object);
            System.out.println("list1 = " + list1);
            for(int j=0; j<list1.size(); j++){
                GalleryDto galleryDto = GalleryDto.builder()
                        .gname((String)list1.get(j).get("gname"))
                        .boardEntity(BoardEntity.builder()
                                .bno((Integer) list1.get(j).get("bno")).build())
                        .build();
                galleryDtoList.add(galleryDto);
            }
        }
        return galleryDtoList ;

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

    //=========================== 댓글 등록 ==========================//
    @Transactional
    public boolean doPostReply(ReplyDto replyDto){
        ReplyEntity replyEntity=replyDto.toEntity();
        MemberEntity memberEntity = memberService.loginEntity();

        BoardEntity boardEntity= BoardEntity.builder()
                .bno(replyDto.getBno())
                .build();
        replyEntity.setMemberEntity(memberEntity);
        replyEntity.setBoardEntity(boardEntity);
        System.out.println("boardEntity = " + boardEntity);

        replyEntityRepository.save(replyEntity);
        return true;
    }
    //=========================== 댓글 출력 ==========================//
    @Transactional
    public List<ReplyDto> doGetReply(int bno){
        List<Map<Object,Object>> REList=replyEntityRepository.findByBno(bno);
        List<ReplyDto> list=new ArrayList<>();
        REList.forEach((reply)->{
            ReplyDto replyDto= ReplyDto.builder()
                    .mnickname((String) reply.get("mnickname"))
                    .rno((Integer)reply.get("rno"))
                    .rcontent((String) reply.get("rcontent"))
                    .build();
            list.add(replyDto);
        });
        System.out.println("list = " + list);
        return list;
    }
    //=========================== 댓글 수정 ==========================//
    @Transactional
    public boolean doPutReply(){
        return false;
    }
    //=========================== 댓글 삭제 ==========================//
    @Transactional
    public boolean doDeleteReply(){
        return false;
    }
}
