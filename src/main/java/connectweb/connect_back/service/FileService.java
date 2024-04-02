package connectweb.connect_back.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {

    String buildUpload="C:\\Users\\504\\Desktop\\Connect_Web_Team2\\build\\resources\\main\\img\\mimg\\";
    // 프로필 사진 업데이트
    public String FileUpload(MultipartFile multipartFile){
        String uuid= UUID.randomUUID().toString();
        String filename =uuid+"_"+multipartFile.getOriginalFilename().replace("_","-");
        File file= new File(buildUpload+filename);
        System.out.println("file = " + file);
        System.out.println("file.exists() = " + file.exists());
        //2.
        try {
            multipartFile.transferTo(file);
        }catch (Exception e){
            System.out.println("e = " + e);
            return null;
        }
        return filename;
    }

}
