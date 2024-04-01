package connectweb.connect_back.service.member;

import connectweb.connect_back.model.dto.FollowDto;
import connectweb.connect_back.model.entity.member.FollowEntity;
import connectweb.connect_back.model.repository.member.FollowEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@Service
public class FollowService {
    @Autowired
    MemberService memberService;
    @Autowired
    FollowEntityRepository followEntityRepository;

    // ======================== [팔로우] ======================== //
    public boolean doFollowPost(FollowDto followDto){
        if(memberService.loginInfo()!=null){
            followDto.setFromfollow(memberService.loginEntity().getMno());
            FollowEntity followEntity = followEntityRepository.save(followDto.toEntity());
            if(followEntity.getFno()>0)return true;
        };
        return false;
    }
    // ======================== [언팔로우] ======================== //
    public boolean doFollowDelete(int fno){
        if(memberService.loginInfo()!=null){
            followEntityRepository.delete(FollowEntity.builder().fno(fno).build());
        }
        return true;
    }
    // ======================== [팔로워 확인] ======================== //
    public List<Map<Object,Object>> doFollowerGet(int mno){
        if(memberService.loginInfo().getMno() == mno)return followEntityRepository.doFollowerGet(memberService.loginEntity().getMno());
        return null;
    }
    // ======================== [ 팔로잉 확인] ======================== //
    public List<Map<Object,Object>> doFollowingGet(int mno){
        if(memberService.loginInfo().getMno() == mno)return followEntityRepository.doFollowingGet(memberService.loginEntity().getMno());
        return null;
    }

}
