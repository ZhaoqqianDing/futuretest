package com.futuredreamtraveller.demo.Mapper;

import com.futuredreamtraveller.demo.Entity.Benefit;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BenefitMapper {
    Benefit getBenefitByName(String material);
    Benefit[] getAllBenefit();
}
