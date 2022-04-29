package com.futuredreamtraveller.demo.Common;

import java.util.HashMap;
import java.util.Map;

public enum RespCodeEnum {
    SYS_ERROR("-1", "system busy"),
    COM_3("1", "lack parameters"),
    COM_4("2", "do not support this function currently"),
    COM_5("3", "do not have rights"),
    COM_6("4", "log in failed"),
    COM_8("5", "failed to encryption"),
    COM_9("6", "failed to decryption"),

    TRD_0000("0000", "operation successful"),
    TRD_0001("0001", "the user do not have permission"),
    TRD_0002("0002", "the user should log in first"),
    TRD_0003("0003", "the parameters have something wrong"),
    TRD_0004("0004", "more");



    private String respcode;
    private String message;

    public String getRespcode() {
        return this.respcode;
    }

    public void setRespcode(String respcode) {
        this.respcode = respcode;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private RespCodeEnum(String respcode, String message) {
        this.respcode = respcode;
        this.message = message;
    }

    public static String getMessage(String code) {
        String desc = code;
        RespCodeEnum[] var2 = values();
        int var3 = var2.length;

        for(int var4 = 0; var4 < var3; ++var4) {
            RespCodeEnum bn = var2[var4];
            if (code.equals(bn.getRespcode())) {
                desc = bn.message;
                break;
            }
        }

        return desc;
    }

    public Map<String, String> getMap() {
        Map<String, String> map = new HashMap();
        map.put("respcode", this.respcode);
        map.put("respmsg", this.message);
        return map;
    }

    public ResponseBo toResponseBo() {
        ResponseBo responseBo = new ResponseBo();
        responseBo.setRespcode(this.respcode);
        responseBo.setRespmsg(this.message);
        return responseBo;
    }

    public ResponseBo toResponseBoAppendMsg(String msg) {
        ResponseBo responseBo = new ResponseBo();
        responseBo.setRespcode(this.respcode);
        responseBo.setRespmsg(this.message + msg);
        return responseBo;
    }



}
