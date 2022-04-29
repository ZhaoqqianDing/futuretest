package com.futuredreamtraveller.demo.Controller;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.Emission;
import com.futuredreamtraveller.demo.Service.CalculatorService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.jws.WebParam;
import javax.servlet.http.HttpServletRequest;
import java.util.regex.Pattern;

@RequestMapping("/CalculatorController")
@Slf4j
@RestController
//comment: this controller use to do the business logic
//author: Zhongyuan Liu
public class CalculatorController {
    @Autowired
    private CalculatorService calculatorService;
    private Emission[] emissionArray;
    // This method is been given up, may be future will use
    @RequestMapping("/test")
    public String[] test(HttpServletRequest request, Model model){
        String num = CommonUtils.trim(request.getParameter("distance"));

      //  String type=(String)(request.getSession().getAttribute("session_Traffic_tools"));


        log.info("Your input is: "+num);
        String[] ans=new String[3];
        try{
            ans=calculatorService.calculatorTheBenefit(Double.valueOf(num));
        }
        catch (Exception e){
            model.addAttribute("errorPrompt","errors, please connect us or try again latter");
            return new String[]{"errors, please connect us or try again latter!","",""};
        }
        model.addAttribute("recommend",ans[0]);
        model.addAttribute("result",ans[1]);
        model.addAttribute("otherSolution",ans[2]);
        return ans;
    }
    // This method is been given up, may be future will use
    @RequestMapping("/chooseType")
    public String chooseType(HttpServletRequest request){
        String type = CommonUtils.trim(request.getParameter("type"));
        request.getSession().setAttribute("session_Traffic_tools",type);
        log.info("User Choose type: "+ type);
        return "You choose "+type;
    }
    //used to calculate the prompt
    @RequestMapping("/useMapCalculator")
    public String useMapCalculator(HttpServletRequest request, Model model){
        log.info("enter in ajax");
        //get parameters from http request
        String type = CommonUtils.trim(request.getParameter("type"));
        String duration =  CommonUtils.trim(request.getParameter("duration"));
        String distance =  CommonUtils.trim(request.getParameter("distance"));
        //change format
        double durationDou = Double.valueOf(duration);
        double distanceDou = Double.valueOf(distance);
        //get type co2 emmision as k
        double k=0;
        try{
            k=calculatorService.calculateThePrompt(type);
        }
        catch (Exception e){
            log.info("find the type:" +type+" cost meet an error, should check type is exist in the DataBase!");
            return"can not find this type!";
        }
        if(k==0){
            return"can not find this type!";
        }
        else{
            //generate the prompt
            double distanceKm = distanceDou/1000;
            double originalCost = distanceKm*153.71;
            double afterCost = distanceKm*k;
            String distanceKmStr = String .format("%.2f",distanceKm);
            String originalCostStr = String .format("%.2f",originalCost);
            String afterCostStr= String .format("%.2f",afterCost);
            int minutes = (int)(durationDou/60);
            StringBuilder ansSB = new StringBuilder();
            ansSB.append("The distance is: "+distanceKmStr+"km"+"\n");
            if(minutes>0){
                ansSB.append("The duration of the travel is: ");
                ansSB.append(minutes);
                ansSB.append(" minutes");
                ansSB.append("\n");
            }
            ansSB.append("If drive, it will cost CO2: "+originalCostStr+"g"+"\n");
            ansSB.append("If use "+type+", it will cost CO2: "+afterCostStr+"g"+"\n");
            return ansSB.toString();


        }

    }
    @RequestMapping("/visual")
    public double[] visual(){
        log.info("enter into visual method");
        double[] ans = new double[6];
        try{
           ans=calculatorService.visual();
        }
        catch (Exception e){
            log.info(e+"");
        }
        return ans;
    }
    @RequestMapping("/sortEmissionArray")
    public Emission[] sortEmissionArray(){
        emissionArray = new Emission[39];
        try{
            emissionArray = calculatorService.sortEmission();
        }
        catch (Exception e){
            log.info("can not sort emission due to: "+e );
        }
        return emissionArray;
    }
    @RequestMapping("/sortEmissionArrayBySpeed")
    public Emission[] sortEmissionArrayBySpeed(){
        emissionArray = new Emission[39];
        try{
            emissionArray = calculatorService.sortEmissionArrayBySpeed();
        }
        catch (Exception e){
            log.info("can not sort emission due to: "+e );
        }
        return emissionArray;
    }
}
