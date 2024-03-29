package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.dto.BoardDto;
import connectweb.connect_back.model.entity.BaseTime;
import connectweb.connect_back.model.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Date;

@Entity
@Table(name="board")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BoardEntity extends BaseTime {
    /*
    bno	// 게시물 번호
	bcontent	// 내용
	mno	// 작성자
	bdate	// 작성일 - 상속 받음
	bview	// 조회수
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bno; // 게시물 번호

    @Column(columnDefinition = "longtext" )
    private String bcontent; //내용

    @Column
    @ColumnDefault("0")
    private int bview; //조회수

    //================ FK 필드
    @JoinColumn(name="mno_fk") //fk 필드명
    @ManyToOne // 해당 필드 참조
    private MemberEntity memberEntity;

   //- 엔티티를 dto로 변환하는 메소드
    public BoardDto toDto(){
        return BoardDto.builder()
                .bno(this.bno)
                .bcontent(this.bcontent)
                .bview(this.bview)
                .build();
    }
}
