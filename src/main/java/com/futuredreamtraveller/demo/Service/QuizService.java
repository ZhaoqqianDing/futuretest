package com.futuredreamtraveller.demo.Service;

import com.futuredreamtraveller.demo.Entity.Question;

public interface QuizService {
    Question getQuestionById(int id);
    Question[] getQuizByIdList(int[] idList);
}
