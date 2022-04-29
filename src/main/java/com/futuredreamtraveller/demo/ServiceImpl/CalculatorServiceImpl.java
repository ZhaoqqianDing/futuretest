package com.futuredreamtraveller.demo.ServiceImpl;

import com.futuredreamtraveller.demo.Entity.Benefit;
import com.futuredreamtraveller.demo.Entity.Emission;
import com.futuredreamtraveller.demo.Mapper.BenefitMapper;
import com.futuredreamtraveller.demo.Mapper.EmissionMapper;
import com.futuredreamtraveller.demo.Service.CalculatorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;

@Slf4j
@Service
public class CalculatorServiceImpl implements CalculatorService {
    @Resource
    BenefitMapper benefitMapper;
    @Resource
    EmissionMapper emissionMapper;
    private Double double1;
    private Double double2;
    private Double double3;
    private Double double4;

    public String[] calculatorTheBenefit(double num){
        log.debug("enter into CalculatorSerice calculate the benefits");
        StringBuilder resultSb = new StringBuilder();
       // resultSb.append("Your cost is equal to"+"\n");
        double emissionNum = 0;

//        try{
//            Benefit[] benefits= benefitMapper.getAllBenefit();
//            for(int i =0;i<benefits.length;i++){
//                String result = String .format("%.2f",num/benefits[i].getCO2());
//                resultSb.append("material: "+benefits[i].getMaterial()+" weight: "+result+"\n");
//            }
//        }
//        catch(Exception e){
//            log.info("can not find the database data.please check again");
//            log.info(e+"");
//            return "can not work now,please try again later";
//        }
        String[] ans = new String[3];
        String recommandType ="";
        if(num>10000){
            ans[0]="plane";
            ans[2]="driving";
            recommandType="Short-haul flight (economy)";
        }
        else if(num>100){
            ans[0]="light rail or tram";
            ans[2]="driving";
            recommandType="Light rail and tram";
        }
        else if(num>50){
            ans[0]="driving";
            ans[2]="light rail or tram";
            recommandType="Small car (petrol)";
        }
        else if(num>8){
            ans[0]="Bus";
            ans[2]="Bicycle";
            recommandType="Bus";

        }
        else if(num>5){
            ans[0]="Bicycle";
            ans[2]="Walking";
            recommandType="0";

        }
        else{
            ans[0]="Walking";
            ans[2]="Bicycle";
            recommandType="0";

        }
        try{
            if(!recommandType.equals("0")){
                emissionNum = emissionMapper.getEmissionByName(recommandType);
            }

        }
        catch (Exception e){
            log.info(e+"");
            return  new String[]{"can not work now,please try again later","",""};
        }
        if( !recommandType.equals("0")) {
            double4=num;
            num = num * emissionNum / 1000;
            log.info("emission: " + emissionNum);
            double1=num;
            double2=num*1.7;
            double3=num * 0.00096;
            String num1 = String.format("%.2f", num);
            String num2 = String.format("%.2f", num * 1.7);
            String num3 = String.format("%.2f", num * 0.00096);
            resultSb.append("the CO2 cost is: " + num1 + "kg; ");
            resultSb.append("equals to use water: " + num2 + "g; ");
            resultSb.append("equals a car run on the way: " + num3 + "day; " );
            ans[1]=resultSb.toString();
        }
        else{
            ans[1]="No worries, this transportation has no carbon dioxide emission";
        }
        return ans;
    }

    public double calculateThePrompt(String type){
       log.info("try to find the "+type+" cost");
       double ans=0;
       try{
           ans= emissionMapper.getEmissionByName(type);
       }
       catch (Exception e){
           log.info("can not find this type");
           return 0;
       }
       return ans;
    }
    public Emission[] sortEmission(){
        Emission[] ans = new Emission[39];
        try{
            ans = emissionMapper.sortEmissionByCo2();
        }
        catch (Exception e){
            log.info("can not sort emission due to: "+e);
        }
        return ans;
    }
    public Emission[] sortEmissionArrayBySpeed(){
        Emission[] ans = new Emission[39];
        try{
            ans = emissionMapper.sortEmissionBySpeed();
        }
        catch (Exception e){
            log.info("can not sort emission due to: "+e);
        }
        return ans;
    }
    public double[] visual(){
        double[] ans = new double[6];
        ans[0]=double1;
        ans[1]=double2;
        ans[2]=double3;
        ans[3]=double4*142/1000;
        ans[4]=ans[3]*1.7;
        ans[5]=ans[3]*0.00096;
        return ans;

    }

}
