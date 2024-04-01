package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.anonymBoardEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class anonymBoardDto {
    private int abno;
    private String abcontent;


    public anonymBoardEntity anEntity(){
        return anonymBoardEntity.builder()
                .abno(this.abno)
                .abcontent(this.abcontent)
                .build();
    }
}
