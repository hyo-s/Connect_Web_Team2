package connectweb.connect_back.model.repository.board;

import connectweb.connect_back.model.entity.board.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardEntityRepository extends JpaRepository<BoardEntity, Integer> {
}
