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

    // write
    @PostMapping("/post.do")
    public boolean postBirthBoard(BirthBoardDto birthBoardDto){
        System.out.println("birthBoardDto = " + birthBoardDto);
        return birthBoardService.postBirthBoard(birthBoardDto);
    }
    // list
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

    // delete
    @DeleteMapping("/delete.do")
    public boolean doDeleteBirthBoard(int mno){
        System.out.println("mno = " + mno);
        System.out.println("BirthBoardController.doDeleteBirthBoard");
        return birthBoardService.doDeleteBirthBoard(mno);
    }
}
