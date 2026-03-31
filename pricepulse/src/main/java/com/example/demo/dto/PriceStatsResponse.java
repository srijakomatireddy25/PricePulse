package com.example.demo.dto;

public class PriceStatsResponse {

    private Long productId;
    private Double lowestPrice;
    private Double highestPrice;
    private Double averagePrice;
    private Double priceChangePercentage;

    public PriceStatsResponse(Long productId, Double lowestPrice, Double highestPrice, Double averagePrice, Double priceChangePercentage) {
        this.productId = productId;
        this.lowestPrice = lowestPrice;
        this.highestPrice = highestPrice;
        this.averagePrice = averagePrice;
        this.priceChangePercentage=priceChangePercentage;
    }

    public Long getProductId() {
        return productId;
    }

    public Double getLowestPrice() {
        return lowestPrice;
    }

    public Double getHighestPrice() {
        return highestPrice;
    }

    public Double getAveragePrice() {
        return averagePrice;
    }
    public Double getPriceChangePercentage() {
        return priceChangePercentage;
    }

}