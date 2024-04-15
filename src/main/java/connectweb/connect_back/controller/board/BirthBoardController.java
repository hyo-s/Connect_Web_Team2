package connectweb.connect_back.controller.board;


import connectweb.connect_back.model.dto.BirthBoardDto;
import connectweb.connect_back.service.board.BirthBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/birthboard")
public class BirthBoardController {
    @Autowired private BirthBoardService birthBoardService;

    // 게시물 쓰기
    @PostMapping("/post.do")
    public boolean postBirthBoard(BirthBoardDto birthBoardDto){
        System.out.println("postbirthBoardDto = " + birthBoardDto);
        return birthBoardService.postBirthBoard(birthBoardDto);
    }
    // 전체출력
    @GetMapping("/get.do")
    public List<BirthBoardDto> doGetBirthBoard(){
        return birthBoardService.doGetBirthBoard();
    }

    // view
//    @GetMapping("/view.do")
//    public List<BirthBoardDto> ViewBirthBoard(String mnickname){
//        System.out.println("mnickname = " + mnickname);
//        return birthBoardService.ViewBirthBoard(mnickname);
//    }

    // 게시글 삭제
    @DeleteMapping("/delete.do")
    public boolean doDeleteBirthBoard(int bbno){
        System.out.println("controllerbbno = " + bbno);
        return birthBoardService.doDeleteBirthBoard(bbno);
    }
}
