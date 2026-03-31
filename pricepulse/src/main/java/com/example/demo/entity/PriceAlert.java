package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
public class PriceAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;

    private double targetPrice;

    private String email;

    public PriceAlert() {}

    public PriceAlert(Long id, Product product, double targetPrice, String email) {
        this.id = id;
        this.product = product;
        this.targetPrice = targetPrice;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public double getTargetPrice() {
        return targetPrice;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setTargetPrice(double targetPrice) {
        this.targetPrice = targetPrice;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}