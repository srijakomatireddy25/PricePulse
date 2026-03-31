package com.example.demo.dto;

public class PriceDropResponse {

    private String product;
    private String seller;
    private Double oldPrice;
    private Double newPrice;

    public PriceDropResponse(String product, String seller, Double oldPrice, Double newPrice) {
        this.product = product;
        this.seller = seller;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
    }

    public String getProduct() {
        return product;
    }

    public String getSeller() {
        return seller;
    }

    public Double getOldPrice() {
        return oldPrice;
    }

    public Double getNewPrice() {
        return newPrice;
    }
}