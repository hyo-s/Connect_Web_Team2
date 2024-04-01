package connectweb.connect_back.controller.member;

import connectweb.connect_back.model.dto.FollowDto;
import connectweb.connect_back.service.member.FollowService;
import connectweb.connect_back.service.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/conn/m")
@CrossOrigin("http://localhost:3000")
public class FollowController {

    @Autowired
    FollowService followService;

    // ======================== [팔로우] ======================== //
    @PostMapping("/follow/post.do")
    public boolean doFollowPost(FollowDto followDto){
        return followService.doFollowPost(followDto);
    }
    // ======================== [언팔로우] ======================== //
    @DeleteMapping("/follow/delete.do")
    public boolean doFollowDelete(@RequestParam int fno){
        return followService.doFollowDelete(fno);
    }
    // ======================== [ 팔로워 확인] ======================== //
    @GetMapping("/follower/get.do")
    public List<Map<Object,Object>> doFollowerGet(int mno){
        return followService.doFollowerGet(mno);
    }
    // ======================== [ 팔로잉 확인] ======================== //
    @GetMapping("/following/get.do")
    public List<Map<Object,Object>> doFollowingGet(int mno){
        return followService.doFollowingGet(mno);
    }
}
