package connectweb.connect_back.service.member;

import connectweb.connect_back.model.repository.member.MemberEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    MemberEntityRepository memberEntityRepository;
}
