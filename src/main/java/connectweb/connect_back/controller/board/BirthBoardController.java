package connectweb.connect_back.controller.board;


import connectweb.connect_back.model.dto.BirthBoardDto;
import connectweb.connect_back.service.board.BirthBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/birthboard")
public class BirthBoardController {
    @Autowired private BirthBoardService birthBoardService;

    @PostMapping("/post.do")
    public boolean postBirthBoard(BirthBoardDto birthBoardDto){
        System.out.println("birthBoardDto = " + birthBoardDto);
        return birthBoardService.postBirthBoard(birthBoardDto);
    }
}
