package com.futuredreamtraveller.demo.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/PageController")
@Slf4j
@Controller
public class PageController {
    //comment: this controller used to navigate to different pages
    //author: Zhongyuan Liu
    @RequestMapping("/toIndex")
    public String index(){
        log.info("enter into index");
        return "index";
    }
//    @RequestMapping("/toGame")
//    public String game(){
//        log.info("enter into game");
//        return "game";
//    }

//    @RequestMapping("/toBlog")
//    public String blog(){
//        log.info("enter into blog");
//        return "blog";
//    }

    @RequestMapping("/toCalculator")
    public String calculator(){
        log.info("enter into calculator");
        return "calculator";
    }
    @RequestMapping("/toHomePage")
    public String toHomePage(){
        return "homePage";
    }
    @RequestMapping("/toQuiz")
    public String toQuiz(){
        return "quiz";
    }

    @RequestMapping("/toMap")
    public String toMap(Model model){
        log.info("enter into calculator");
        model.addAttribute("prompt","Calculate and there will show the result");
        return "Map";
    }

}
