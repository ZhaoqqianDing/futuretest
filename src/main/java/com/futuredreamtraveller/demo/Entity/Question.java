package com.futuredreamtraveller.demo.Entity;

import lombok.Data;

@Data
public class Question {
    private int index;
    private String question;
    private String selectionA;
    private String selectionB;
    private String selectionC;
    private String selectionD;
    private String answer;
    private String analyzeAns;
}
