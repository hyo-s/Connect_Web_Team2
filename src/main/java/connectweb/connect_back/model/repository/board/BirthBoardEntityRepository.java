package connectweb.connect_back.model.repository.board;

import connectweb.connect_back.model.entity.board.BirthBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface BirthBoardEntityRepository extends JpaRepository<BirthBoardEntity, Integer> {


    // 전체글 출력
    @Query(value = "select bbno, mno, cdate, udate, bbcontent from birthboard", nativeQuery = true)
    List<Map<Object,Object>> findAllBirthBoardSQL();
}
