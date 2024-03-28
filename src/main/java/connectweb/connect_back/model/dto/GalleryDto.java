package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.board.GalleryEntity;
import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @ToString @Builder
public class GalleryDto {


    private int gno;
    private String gname;
    private BoardEntity boardEntity;

    //dto를 엔티티로 변환
    public GalleryEntity toGalleryEntity(){
        return GalleryEntity.builder()
                .gno(this.gno)
                .gname(this.gname)
                .boardEntity(this.boardEntity)
                .build();
    }

}
