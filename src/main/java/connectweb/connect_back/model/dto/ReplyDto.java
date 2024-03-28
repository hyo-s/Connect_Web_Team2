package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.ReplyEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ReplyDto {
    private int rno;
    private String rcontent;
    private BoardEntity boardEntity;
    private MemberEntity memberEntity;

    public ReplyEntity toEntity(){
        return ReplyEntity.builder()
                .rno(this.rno)
                .rcontent((this.rcontent))
                .boardEntity(this.boardEntity)
                .memberEntity(this.memberEntity)
                .build();
    }
}

