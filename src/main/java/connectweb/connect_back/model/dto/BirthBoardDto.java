package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BirthBoardDto {
    private int bbno;
    private String bbcontent;


    public BirthBoardEntity birthEntity(){
        return BirthBoardEntity.builder()
                .bbno(this.bbno)
                .bbcontent(this.bbcontent)
                .build();
    }
}
