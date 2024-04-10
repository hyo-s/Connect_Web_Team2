package connectweb.connect_back.model.repository.board;

import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import connectweb.connect_back.model.entity.board.BirthBoardImgEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileEntityRepository extends JpaRepository<BirthBoardImgEntity, Integer> {
}
