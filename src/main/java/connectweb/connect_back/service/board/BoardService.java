package connectweb.connect_back.service.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import connectweb.connect_back.model.repository.board.BoardEntityRepository;
import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {
    @Autowired
    BoardEntityRepository boardEntityRepository;

    @Autowired
    MemberEntityRepository memberEntityRepository;

    @Transactional
    public int doPostBoard(BoardDto boardDto){
        System.out.println("boardDto = " + boardDto);
        MemberEntity memberEntity = MemberEntity.builder()
                .mno(1)
                .mid("aaa")
                .mpw("aaa")
                .mname("aaa")
                .build();
        memberEntityRepository.save(memberEntity);
        boardDto.setMemberEntity(memberEntity);
        boardEntityRepository.save(boardDto.toEntity());
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

    @Transactional
    public int doPutBoard(int bno){
        BoardEntity boardEntity = boardEntityRepository.findById(bno).get();
        boardEntity.setBcontent("수정합니다.");
        return 0;
    }

    @Transactional
    public int doDeleteBoard(int bno){
        boardEntityRepository.deleteById(bno);
        return 0;
    }
}
