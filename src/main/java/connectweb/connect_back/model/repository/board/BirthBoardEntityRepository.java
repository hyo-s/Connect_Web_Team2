package connectweb.connect_back.model.repository.board;

import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BirthBoardEntityRepository extends JpaRepository<BirthBoardEntity, Integer> {
}
