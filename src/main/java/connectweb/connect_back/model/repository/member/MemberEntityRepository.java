package connectweb.connect_back.model.repository.member;

import connectweb.connect_back.model.entity.board.BoardEntity;
import connectweb.connect_back.model.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberEntityRepository extends JpaRepository<MemberEntity, Integer> {

// ========================= [로그인] ========================= //
    @Query(value = "select * from member where mid = :mid and mpw = :mpw", nativeQuery = true)
    MemberEntity findByLoginSQL(String mid, String mpw);

// ======================== [개인페이지 출력할 회원정보] ======================== //
    MemberEntity findByMnickname(String mnickname);

// ========================= [아이디, 닉네임, 이메일, 전화번호 중복검사] ========================= //
    boolean existsByMid(String mid);
    boolean existsByMnickname(String mnickname);
    boolean existsByMemail(String memail);
    boolean existsByMphone(String mphone);
}
