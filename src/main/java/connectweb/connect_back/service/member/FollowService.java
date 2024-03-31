package connectweb.connect_back.service.member;

import connectweb.connect_back.model.dto.FollowDto;
import connectweb.connect_back.model.entity.member.FollowEntity;
import connectweb.connect_back.model.repository.member.FollowEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return false;
    }
    // ======================== [팔로우 확인] ======================== //
    public List<FollowDto> doFollowGet(){
        if(memberService.loginInfo()!=null){

        }
        return null;
    }

}
