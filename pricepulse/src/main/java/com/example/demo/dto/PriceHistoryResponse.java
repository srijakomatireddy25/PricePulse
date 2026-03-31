package com.example.demo.dto;

import java.time.LocalDateTime;

public class PriceHistoryResponse {

	private double price;
    private LocalDateTime recordedAt;
    private String seller;

    public PriceHistoryResponse(double price, LocalDateTime recordedAt, String seller) {
        this.price = price;
        this.recordedAt = recordedAt;
        this.seller = seller;
    }

    public double getPrice() 
    {
    	return price; 
    	}
    public LocalDateTime getRecordedAt() 
    { 
    		return recordedAt; 
    	}
    public String getSeller() { return seller; }
}