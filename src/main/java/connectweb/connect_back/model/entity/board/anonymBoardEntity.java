package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.dto.anonymBoardDto;
import connectweb.connect_back.model.entity.BaseTime;
import connectweb.connect_back.model.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
@Entity
@Table(name="anonymBoard")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class anonymBoardEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int abno; // 익명게시판 번호

    @Column(columnDefinition = "longtext")
    private String abcontent; // 게시판 내용


    //Fk 필드
    @JoinColumn(name = "mno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private MemberEntity memberEntity;


    public anonymBoardDto abDto(){
        return anonymBoardDto.builder()
                .abno(this.abno)
                .abcontent(this.abcontent)
                .build();
    }
}
