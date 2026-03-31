package com.example.demo.dto;

public class PriceRequest {

    private Long productId;
    private Long sellerId;
    private double price;

    public Long getProductId() { return productId; }
    public Long getSellerId() { return sellerId; }
    public double getPrice() { return price; }

    public void setProductId(Long productId) { this.productId = productId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    public void setPrice(double price) { this.price = price; }
}