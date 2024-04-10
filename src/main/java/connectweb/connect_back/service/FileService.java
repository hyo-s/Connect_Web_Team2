package connectweb.connect_back.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {

    String buildUpload="C:\\Users\\504\\Desktop\\team2_Web\\build\\resources\\main\\static\\img\\mimg\\";

    String buildUpload2 ="C:\\Users\\504\\Desktop\\team2_Web\\build\\resources\\main\\static\\img\\boardimg\\";

    String buildUpload3 ="C:\\Users\\kimmi\\OneDrive\\바탕 화면\\Connect_Web_Team2\\build\\resources\\main\\static\\img\\birthboardimg\\";

    // 프로필 사진 업데이트
    public String FileUpload(MultipartFile multipartFile){
        String uuid= UUID.randomUUID().toString();
        String filename =uuid+"_"+multipartFile.getOriginalFilename().replace("_","-");
        File file= new File(buildUpload+filename);
        System.out.println("file = " + file);
        System.out.println("file.exists() = " + file.exists());
        //2.
        try {
            if(multipartFile.isEmpty()){
                return "default.png";
            }else{
                multipartFile.transferTo(file);
            }
        }catch (Exception e){
            System.out.println("e = " + e);
            return "default.png";
        }
        return filename;
    }
    public String FileUpload2(MultipartFile multipartFile){
        String uuid= UUID.randomUUID().toString();
        String filename =uuid+"_"+multipartFile.getOriginalFilename().replace("_","-");
        File file= new File(buildUpload2+filename);
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

    public String FileUpload3(MultipartFile multipartFile){
        String uuid= UUID.randomUUID().toString();
        String filename =uuid+"_"+multipartFile.getOriginalFilename().replace("_","-");
        File file= new File(buildUpload3+filename);
        System.out.println("file = " + file);
        System.out.println("file.exists() = " + file.exists());
        //2.
        try {
            if(multipartFile.isEmpty()){
                return "default2.png";
            }else{
                multipartFile.transferTo(file);
            }
        }catch (Exception e){
            System.out.println("e = " + e);
            return "default2.png";
        }
        return filename;
    }

}
