package com.example.demo.dto;

public class LowestPriceResponse {

    private Long productId;
    private String sellerName;
    private Double lowestPrice;

    public LowestPriceResponse(Long productId, String sellerName, Double lowestPrice) {
        this.productId = productId;
        this.sellerName = sellerName;
        this.lowestPrice = lowestPrice;
    }

    public Long getProductId() {
        return productId;
    }

    public String getSellerName() {
        return sellerName;
    }

    public Double getLowestPrice() {
        return lowestPrice;
    }
}