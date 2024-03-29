package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;


@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @ToString @Builder
public class GalleryDto {


    private int gno;                    //피드사진번호
    private String gname;               //피드사진경로
    private BoardEntity boardEntity;    //fk

    private MultipartFile gfile; //피드사진

    //dto를 엔티티로 변환
    public GalleryEntity toGalleryEntity(){
        return GalleryEntity.builder()
                .gno(this.gno)
                .gname(this.gname)
                .boardEntity(this.boardEntity)
                .build();
    }

}
