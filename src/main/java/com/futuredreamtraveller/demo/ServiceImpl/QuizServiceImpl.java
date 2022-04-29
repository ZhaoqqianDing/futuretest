package com.futuredreamtraveller.demo.ServiceImpl;

import com.futuredreamtraveller.demo.Entity.Question;
import com.futuredreamtraveller.demo.Mapper.QuestionMapper;
import com.futuredreamtraveller.demo.Service.QuizService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Slf4j
@Service
public class QuizServiceImpl implements QuizService {
    @Resource
    QuestionMapper questionMapper;
    public Question getQuestionById(int id){
        Question question = new Question();
        try{
            question= questionMapper.getQuestionByIndex(id);
        }
        catch (Exception e){
            log.info(e+"");
        }
        return question;
    }
    public Question[] getQuizByIdList(int[] idList){
        Question[] ans= new Question[5];
        try{
            for(int i=0;i<5;i++){
                ans[i]=questionMapper.getQuestionByIndex(idList[i]);
            }
        }
        catch (Exception e){
            log.info(e+"");
        }

        return ans;
    }
}
