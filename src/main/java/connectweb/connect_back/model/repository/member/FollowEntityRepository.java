package connectweb.connect_back.model.repository.member;

import connectweb.connect_back.model.entity.member.FollowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface FollowEntityRepository extends JpaRepository<FollowEntity, Integer> {

    // ======================== [팔로워 확인] ======================== //
    @Query(value = "select f.fno, m.mname from follow f join member m on m.mno = f.fromfollow where f.tofollow = :mno", nativeQuery = true)
    List<Map<Object,Object>> doFollowerGet(int mno);
    // ======================== [팔로잉 확인] ======================== //
    @Query(value = "select f.fno, m.mname from follow f join member m on m.mno = f.tofollow where f.fromfollow = :mno", nativeQuery = true)
    List<Map<Object,Object>> doFollowingGet(int mno);
}
