package com.futuredreamtraveller.demo.Mapper;

import com.futuredreamtraveller.demo.Entity.Question;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface QuestionMapper {
    Question getQuestionByIndex(int index);
}
