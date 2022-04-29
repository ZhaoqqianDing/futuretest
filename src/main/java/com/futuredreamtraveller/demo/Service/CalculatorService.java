package com.futuredreamtraveller.demo.Service;

import com.futuredreamtraveller.demo.Entity.Emission;

public interface CalculatorService {
     String[] calculatorTheBenefit(double num);
     double calculateThePrompt(String type);
     Emission[] sortEmission();
     Emission[] sortEmissionArrayBySpeed();
     double[] visual();
}
