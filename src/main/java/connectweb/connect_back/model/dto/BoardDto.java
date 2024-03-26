package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BoardDto {

    private int bno; // 게시물 번호
    private String bcontent; //내용
    private  int bview; //조회수
    private MemberEntity memberEntity;

    public BoardEntity toEntity(){
        return BoardEntity.builder()
                .bno(this.bno)
                .bcontent(this.bcontent)
                .bview(this.bview)
                .build();
    }
}
