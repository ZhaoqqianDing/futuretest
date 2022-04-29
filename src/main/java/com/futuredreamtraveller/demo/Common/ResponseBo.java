package com.futuredreamtraveller.demo.Common;

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//


import java.io.Serializable;

public class ResponseBo<T> implements Serializable {
    private String respcode;
    private String respmsg;
    private String loginsts;
    private T result;

    public ResponseBo() {
    }

    public String getRespcode() {
        return this.respcode;
    }

    public String getRespmsg() {
        return this.respmsg;
    }

    public String getLoginsts() {
        return this.loginsts;
    }

    public T getResult() {
        return this.result;
    }

    public void setRespcode(final String respcode) {
        this.respcode = respcode;
    }

    public void setRespmsg(final String respmsg) {
        this.respmsg = respmsg;
    }

    public void setLoginsts(final String loginsts) {
        this.loginsts = loginsts;
    }

    public void setResult(final T result) {
        this.result = result;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof ResponseBo)) {
            return false;
        } else {
            ResponseBo<?> other = (ResponseBo)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label59: {
                    Object this$respcode = this.getRespcode();
                    Object other$respcode = other.getRespcode();
                    if (this$respcode == null) {
                        if (other$respcode == null) {
                            break label59;
                        }
                    } else if (this$respcode.equals(other$respcode)) {
                        break label59;
                    }

                    return false;
                }

                Object this$respmsg = this.getRespmsg();
                Object other$respmsg = other.getRespmsg();
                if (this$respmsg == null) {
                    if (other$respmsg != null) {
                        return false;
                    }
                } else if (!this$respmsg.equals(other$respmsg)) {
                    return false;
                }

                Object this$loginsts = this.getLoginsts();
                Object other$loginsts = other.getLoginsts();
                if (this$loginsts == null) {
                    if (other$loginsts != null) {
                        return false;
                    }
                } else if (!this$loginsts.equals(other$loginsts)) {
                    return false;
                }

                Object this$result = this.getResult();
                Object other$result = other.getResult();
                if (this$result == null) {
                    if (other$result != null) {
                        return false;
                    }
                } else if (!this$result.equals(other$result)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ResponseBo;
    }

    public int hashCode() {
        int PRIME = 1;
        int result = 1;
        Object $respcode = this.getRespcode();
        result = result * 59 + ($respcode == null ? 43 : $respcode.hashCode());
        Object $respmsg = this.getRespmsg();
        result = result * 59 + ($respmsg == null ? 43 : $respmsg.hashCode());
        Object $loginsts = this.getLoginsts();
        result = result * 59 + ($loginsts == null ? 43 : $loginsts.hashCode());
        Object $result = this.getResult();
        result = result * 59 + ($result == null ? 43 : $result.hashCode());
        return result;
    }

    public String toString() {
        return "ResponseBo(respcode=" + this.getRespcode() + ", respmsg=" + this.getRespmsg() + ", loginsts=" + this.getLoginsts() + ", result=" + this.getResult() + ")";
    }
}
