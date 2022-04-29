package com.futuredreamtraveller.demo.Controller;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.Question;
import com.futuredreamtraveller.demo.Service.QuizService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.Random;

@RequestMapping("/QuizController")
@Slf4j
@RestController
public class QuizController {
    @Autowired
    private QuizService quizService;    // choose five random number
    public int[] getRandomList(int maxNum){
        int[] ans = new int[5];
        Random random = new Random();
        HashSet<Integer> hashSet =  new HashSet<>();
        for(int i=0;i<5;i++){
          int k = random.nextInt(maxNum);
          while(hashSet.contains(k)){
              k=random.nextInt(maxNum);
          }
          hashSet.add(k);
          ans[i]=k+1;
          log.info(k+"");
        }
        return ans;
    }

    @RequestMapping("/getFiveQuestion")
    //@ResponseBody
    public Question[] getFiveQuestion(HttpServletRequest request){
        log.info("enter into quiz controller, now set the quiz");
        Question[] ans = new Question [5];
        int[] ansId = getRandomList(19);
        try{
            ans=quizService.getQuizByIdList(ansId);
        }
        catch (Exception e){
            log.info("failed due to: "+e );
        }
        return ans;
    }

    @RequestMapping("/getQuestionById")
    public Question getQuestionById(HttpServletRequest request){
        String index = CommonUtils.trim(request.getParameter("index"));
        int quizId = Integer.valueOf(index);
        Question question = new Question();
        try{
            question = quizService.getQuestionById(quizId);
        }
        catch (Exception e){
            log.info("can not find the question due to: "+e);
        }
        return question;
    }
}
