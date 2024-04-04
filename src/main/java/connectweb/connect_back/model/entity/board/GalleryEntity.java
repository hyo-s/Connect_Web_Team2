package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.dto.GalleryDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Table(name = "gallery")
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @ToString @Builder
public class GalleryEntity {

    @Id
    private String gname; //주소

    @JoinColumn(name = "bno_fk")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BoardEntity boardEntity; //게시물번호 (fk)

    //엔티티를 dto로 변환
    public GalleryDto toGalleryDto(){
        return GalleryDto.builder()
                .boardEntity(this.boardEntity)
                .gname(this.gname)
                .build();
    }


}
