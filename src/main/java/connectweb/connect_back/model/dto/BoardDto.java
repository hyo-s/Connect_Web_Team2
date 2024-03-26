package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.board.BoardEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BoardDto {


    public BoardEntity toEntity(){
        return BoardEntity.builder().build();
    }
}
