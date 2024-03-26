package connectweb.connect_back.service.board;

import connectweb.connect_back.model.repository.board.BoardEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {
    @Autowired
    BoardEntityRepository boardEntityRepository;
}
