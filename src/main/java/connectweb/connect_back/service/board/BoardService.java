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
        if(memberEntity == null) return 2;

        //글쓰기
        BoardEntity boardEntity = boardEntityRepository.save(boardDto.toEntity());

        boardEntity.setMemberEntity(memberEntity);
        System.out.println("boardDto = " + boardDto);

        //피드이미지----------------------------------------
        boardDto.getGfile().forEach((uploadFile)->{
            String fileName = fileService.FileUpload2(uploadFile);
            System.out.println("fileName = " + fileName);

            GalleryEntity galleryEntity = GalleryEntity.builder()
                    .gname(fileName)
                    .boardEntity(boardEntity)
                    .build();

            galleryEntityRepository.save(galleryEntity);
            System.out.println("fileName = " + fileName);
            //------------------------------------------------
            ;
        });
        return 1;
    }

    // 전체 게시글 출력 //
    @Transactional
    public List<BoardDto> doGetBoard(){
        List<Map<Object,Object>> list1=boardEntityRepository.findAllBoardSQL();
        System.out.println("list1 = " + list1);

        List<BoardDto> boardDtoList = new ArrayList<>();
        list1.forEach((data)->{
            Optional<BoardEntity>boardEntity=boardEntityRepository.findById((Integer)data.get("bno"));
            BoardDto boardDto=boardEntity.get().toDto();
            boardDto.setMnickname((String)data.get("mnickname"));
            boardDto.setCdate((String) data.get("cdate"));
            boardDto.setProfilename((String) data.get("mimg"));
           /* BoardDto boardDto=BoardDto.builder()
                    .bno((Integer)data.get("bno"))
                    .bcontent((String) data.get("bcontent"))
                    .mnickname((String)data.get("mnickname"))
                    .gnameList((List<String>) data.get("gname"))
                    .build();*/
            boardDtoList.add(boardDto);
            System.out.println(boardDtoList);
        });
        System.out.println("boardDtoList = " + boardDtoList);

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

    public List<GalleryDto> dogetBoardImg(int bno){
        List<Map<Object,Object>> list = galleryEntityRepository.fineGallery(bno);
        List<GalleryDto> galleryDtoList = new ArrayList<>();
        list.forEach((img)->{
            GalleryDto galleryDto=GalleryDto.builder()
                    .bno((Integer)img.get("bno"))
                    .gname((String) img.get("gname"))
                    .build();
            galleryDtoList.add(galleryDto);
        });
        return galleryDtoList;
    }

    //개별피드출력
    public List<BoardDto> getMyBoardList(String mnickname){
        List<Map<Object,Object>> list = boardEntityRepository.findMyBoardList(memberService.memberView(mnickname).getMno());
        List<GalleryDto> galleryDtoList = new ArrayList<>();
        List<BoardDto> boardDtoList = new ArrayList<>();
        for(int i =0; i< list.size(); i++) {
            Optional<BoardEntity> boardEntity = boardEntityRepository.findById((Integer)list.get(i).get("bno"));
            BoardDto boardDto = boardEntity.get().toDto();
            boardDtoList.add(boardDto);
            System.out.println("boardEntity.toString() = " + boardEntity.toString());
            System.out.println("list = " + list);
        }

        return boardDtoList ;

    }

    //게시글 수정
    @Transactional
    public int doPutBoard(BoardDto boardDto){
        System.out.println("BoardService.doPutBoard");
        System.out.println("boardDto = " + boardDto);
        BoardEntity boardEntity = boardEntityRepository.findById(boardDto.getBno()).get();
        boardEntity.setBcontent(boardDto.getBcontent());


        return 0;
    }

    //게시글 삭제
    @Transactional
    public boolean doDeleteBoard(int bno){
        System.out.println("bno = " + bno);
        MemberDto loginDto = memberService.loginInfo();

        Optional<BoardEntity> optionalBoardEntity = boardEntityRepository.findById(bno);
        System.out.println("optionalBoardEntity = " + optionalBoardEntity);
        if(optionalBoardEntity.get().getMemberEntity().getMno() == loginDto.getMno()){
            boardEntityRepository.deleteById(bno);
            return true;
        }
        return false;
    }

    //=========================== 댓글 등록 ==========================//
    @Transactional
    public boolean doPostReply(ReplyDto replyDto){
        ReplyEntity replyEntity=replyDto.toEntity();
        System.out.println(replyEntity);
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
                    .mno((Integer)reply.get("mno"))
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
    public boolean doDeleteReply(int rno){
        replyEntityRepository.deleteById(rno);
        return true;
    }
}
