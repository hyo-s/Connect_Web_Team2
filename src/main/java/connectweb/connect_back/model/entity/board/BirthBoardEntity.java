package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.dto.BirthBoardDto;
import connectweb.connect_back.model.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "birthboard")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BirthBoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bbno; // 익명게시판 번호

    @Column(columnDefinition = "longtext")
    private String bbcontent; // 게시판 내용


    //Fk 필드
    @JoinColumn(name = "mno") // fk 필드명
    @ManyToOne
    private MemberEntity memberEntity;


    public BirthBoardDto birthDto(){
        return BirthBoardDto.builder()
                .bbno(this.bbno)
                .bbcontent(this.bbcontent)
                .build();
    }
}
