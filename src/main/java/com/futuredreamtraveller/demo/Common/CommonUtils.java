package com.futuredreamtraveller.demo.Common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;

public class CommonUtils {
    private static Logger log = LoggerFactory.getLogger(CommonUtils.class);
    private static List<String> ipList = null;
    private static List<Integer> portList = null;
    //private static final char[] hexChar;



    public CommonUtils() {
    }

    public static boolean isNotEmpty(String str) {
        return str != null && !str.isEmpty();
    }



    public static String generateNumbers(int len) {
        StringBuilder sb = new StringBuilder();
        SecureRandom r = new SecureRandom();

        try {
            r = SecureRandom.getInstance("SHA1PRNG");
        } catch (NoSuchAlgorithmException var4) {
            var4.printStackTrace();
        }

        for(int i = 0; i < len; ++i) {
            sb.append("" + r.nextInt(10));
        }

        return sb.toString();
    }


    public static String MD5(String encryString, String Charset) {
        try {
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(encryString.getBytes(Charset));
            byte[] b = digest.digest();
            StringBuffer buf = new StringBuffer("");

            for(int offset = 0; offset < b.length; ++offset) {
                int i = b[offset];
                if (i < 0) {
                    i += 256;
                }

                if (i < 16) {
                    buf.append("0");
                }

                buf.append(Integer.toHexString(i));
            }

            digest = null;

            return buf.toString();
        } catch (Exception var7) {
            log.error("MD5 failed", var7);
            return null;
        }
    }

    public static String trim(Object obj) {
        return obj == null ? "" : obj.toString().trim();
    }



}
