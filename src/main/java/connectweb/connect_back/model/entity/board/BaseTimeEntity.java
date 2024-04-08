package connectweb.connect_back.model.entity.board;


import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public class BaseTimeEntity {
    // 등록날짜
    @CreatedDate
    private LocalDateTime cdate;

    // 수정날짜
    private LocalDateTime udate;
}
