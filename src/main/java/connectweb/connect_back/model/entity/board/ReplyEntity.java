package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.dto.ReplyDto;
import connectweb.connect_back.model.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "reply")
@AllArgsConstructor@NoArgsConstructor
@Getter@Setter@Builder@ToString
public class ReplyEntity {
    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rno;
    private String rcontent;


    // 단방향 : FK 필드
    @JoinColumn(name ="bno")
    @ManyToOne
    private BoardEntity boardEntity;

    // 단방향 : FK 필드
    @JoinColumn(name= "mno")
    @ManyToOne
    private MemberEntity memberEntity;

    // - 엔티리를 dto로 변환하는 메소드
    public ReplyDto toDto(){
        return ReplyDto.builder()
                .rno(this.rno)
                .rcontent(this.rcontent)
//                .boardEntity(this.boardEntity)
//                .memberEntity(this.memberEntity)
                .build();
    }
}
