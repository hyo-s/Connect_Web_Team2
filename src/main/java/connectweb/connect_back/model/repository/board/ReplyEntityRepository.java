package connectweb.connect_back.model.repository.board;


import connectweb.connect_back.model.entity.board.GalleryEntity;
import connectweb.connect_back.model.entity.board.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyEntityRepository extends JpaRepository<ReplyEntity, Integer> {
}
