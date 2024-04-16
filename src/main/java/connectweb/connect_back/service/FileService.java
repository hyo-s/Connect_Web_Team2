package connectweb.connect_back.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {

    String buildUpload="C:\\Users\\504\\Desktop\\Connect_Web_Team2\\build\\resources\\main\\static\\img\\mimg\\";

    String buildUpload3 ="C:\\Users\\504\\Desktop\\Connect_Web_Team2\\build\\resources\\main\\static\\img\\birthboardimg\\";

    String buildUpload2 ="C:\\Users\\504\\Desktop\\Connect_Web_Team2\\build\\resources\\main\\static\\img\\boardimg\\";

    //String buildUpload2 ="C:\\Users\\User\\Desktop\\Connect_Web_Team2\\build\\resources\\main\\static\\img\\boardimg\\";
    // 프로필 사진 업데이트
    public String FileUpload(MultipartFile multipartFile){
        if(multipartFile.isEmpty()){
            return "default.png";
        }
        String s3url;
        String uuid= UUID.randomUUID().toString();
        String filename =uuid+"_"+multipartFile.getOriginalFilename().replace("_","-");
        try {
            s3url= defaultUrl+filename;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(multipartFile.getContentType());
            metadata.setContentLength(multipartFile.getSize());
            amazonS3Client.putObject( bucket, filename,multipartFile.getInputStream(),metadata);
        }catch (Exception e){
            System.out.println("e = " + e);
            return "default.png";
        }


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
        return s3url;
    }

    /*


    public String FileUpload2(MultipartFile multipartFile){
        System.out.println("multipartFile.isEmpty() = " + multipartFile.isEmpty());

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
       */

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

    @Autowired // 그레이들에 implementation 'org.springframework.cloud:spring-cloud-starter-aws:2.2.6.RELEASE'
    private AmazonS3Client amazonS3Client;

    // **** application.properties 에 버킷 설정값 가져와서 변수에 저장 [ 서비스에 보완에 관련된 코드 숨기기 ]
    @Value("${cloud.aws.s3.bucket}") // lombok 아님..
    private String bucket ; // application.properties 에 설정한 버킷명 가져오기
    @Value("${cloud.aws.s3.bucket.url}")
    private String defaultUrl;// application.properties 에 설정한 버킷 저장 경로




    // 2. multipartFile 존재하는 파일 업로드
    public String FileUpload2(MultipartFile multipartFile ){
        String s3url;
        // 1. 파일 이름을 식별 가능한 uuid와 조합
        String uuid = UUID.randomUUID().toString(); // UUID란?? 고유한 id 난수성으로 생성
        // 2. 조합 ( uuid와 파일이름의 구분선을 _ 이기때문에 파일명에 _ 존재할수도 있기때문에 _를 - 로 치환 )
        String filename = uuid+"_"+multipartFile.getOriginalFilename().replaceAll( "_" ,"-");
        // 4.
        try {
            s3url= defaultUrl+filename;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(multipartFile.getContentType());
            metadata.setContentLength(multipartFile.getSize());
            amazonS3Client.putObject( bucket, filename,multipartFile.getInputStream(),metadata);
        }
        catch ( Exception e ){   System.out.println("e = " + e); return null;   }
        return s3url ;
    }

}
