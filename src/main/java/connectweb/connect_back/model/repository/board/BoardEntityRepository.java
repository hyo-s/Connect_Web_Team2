package connectweb.connect_back.model.repository.board;

import connectweb.connect_back.model.entity.board.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BoardEntityRepository extends JpaRepository<BoardEntity, Integer> {

    //내글출력
    @Query(value = "select * from member m inner join board b on m.mno=b.mno_fk where m.mno = :mno", nativeQuery = true)
    public List<Map<Object,Object>> findMyBoardList(int mno);

    @Query(value = "select * from board b inner join gallery g on b.bno=g.bno_fk where b.bno = :bno", nativeQuery = true)
    public List<Map<Object,Object>> findBno(Object bno);


}
