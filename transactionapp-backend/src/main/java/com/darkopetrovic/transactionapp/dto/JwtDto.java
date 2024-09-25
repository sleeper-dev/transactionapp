package com.darkopetrovic.transactionapp.dto;

public class JwtDto {

    private String jwt;
    private long expiredIn;

    public JwtDto(String jwt, long expiredIn) {
        this.jwt = jwt;
        this.expiredIn = expiredIn;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public long getExpiredIn() {
        return expiredIn;
    }

    public void setExpiredIn(long expiredIn) {
        this.expiredIn = expiredIn;
    }
}
