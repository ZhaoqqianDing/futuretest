package com.futuredreamtraveller.demo.Controller;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/CommonController")
@Slf4j
@RestController
public class CommonController {
    @RequestMapping("/checkPassword")
    public String checkPassword(HttpServletRequest request){
        String password = CommonUtils.trim(request.getParameter("password"));
        log.info(password);
        if(password.equals("TA05")){
            return "true";
        }
        else{
            return "false";
        }
    }
}
