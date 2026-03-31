package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Seller seller;

    private double price;

    private LocalDateTime recordedAt;

    public PriceHistory() {}

    public PriceHistory(Long id, Product product, Seller seller, double price, LocalDateTime recordedAt) {
        this.id = id;
        this.product = product;
        this.seller = seller;
        this.price = price;
        this.recordedAt = recordedAt;
    }

    public Long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public Seller getSeller() {
        return seller;
    }

    public double getPrice() {
        return price;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }
}