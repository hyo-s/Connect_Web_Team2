package connectweb.connect_back.model.dto;

import connectweb.connect_back.model.entity.member.MemberEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MemberDto {

    private int mno; // 회원번호
    private String mid; // 아이디
    private String mpw; //비밀번호
    private String mname; // 이름
    private String mkikname; // 닉네임
    private String memail; //이메일
    private String mphone;// 전화번호
    private String mbirth;	//생년월일


    public MemberEntity toEntity(){
        return MemberEntity.builder()
                .mno(this.mno)
                .mid(this.mid)
                .mpw(this.mpw)
                .mname(this.mname)
                .mkikname(this.mkikname)
                .memail(this.memail)
                .mphone(this.mphone)
                .mbirth(this.mbirth)
                .build();
    }
}
