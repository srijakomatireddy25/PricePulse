package com.example.demo.dto;

public class SellerPriceResponse {

    private String seller;
    private Double price;

    public SellerPriceResponse(String seller, Double price) {
        this.seller = seller;
        this.price = price;
    }

    public String getSeller() {
        return seller;
    }

    public Double getPrice() {
        return price;
    }
}