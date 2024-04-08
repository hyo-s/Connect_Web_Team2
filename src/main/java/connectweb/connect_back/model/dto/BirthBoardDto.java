package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.BaseTime;
import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class BirthBoardDto extends BaseTimeDto {
    private int bbno;
    private String bbcontent;


    public BirthBoardEntity birthEntity(){
        return BirthBoardEntity.builder()
                .bbno(this.bbno)
                .bbcontent(this.bbcontent)
                .build();
    }
}
