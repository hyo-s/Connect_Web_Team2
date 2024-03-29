package connectweb.connect_back.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class LoginDto {
    private String mid;
    private String mpw;
}
