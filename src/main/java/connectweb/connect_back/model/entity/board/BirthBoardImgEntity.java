package connectweb.connect_back.model.entity.board;

import connectweb.connect_back.model.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "boardimg")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class BirthBoardImgEntity extends BaseTime {
    @Id
    private String bbimg;

    @JoinColumn(name = "bbno_fk")
    @ManyToOne
    private BirthBoardEntity birthBoardEntity;
}
