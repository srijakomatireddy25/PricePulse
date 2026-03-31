package com.example.demo.controller;

import com.example.demo.dto.LowestPriceResponse;
import com.example.demo.dto.PriceDropResponse;
import com.example.demo.dto.PriceHistoryResponse;
import com.example.demo.dto.PriceStatsResponse;
import com.example.demo.dto.SellerPriceResponse;
import com.example.demo.entity.PriceHistory;
import com.example.demo.service.PriceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prices")
public class PriceController {

    private final PriceService priceService;

    public PriceController(PriceService priceService){
        this.priceService = priceService;
    }

    @PostMapping
    public PriceHistory addPrice(
            @RequestParam Long productId,
            @RequestParam Long sellerId,
            @RequestParam double price){

        return priceService.addPrice(productId, sellerId, price);
    }

    @GetMapping("/product/{productId}")
    public List<PriceHistory> getPriceHistory(@PathVariable Long productId){
        return priceService.getPriceHistory(productId);
    }
    @GetMapping("/lowest/{productId}")
    public LowestPriceResponse getLowestPrice(@PathVariable Long productId) {
        return priceService.getLowestPrice(productId);
    }
    @GetMapping("/drop/{productId}")
    public List<PriceDropResponse> getDrops(@PathVariable Long productId) {
        return priceService.detectPriceDrops(productId);
    }
    @GetMapping("/history/{productId}")
    public List<PriceHistoryResponse> getPriceHistoryResponses(@PathVariable Long productId) {
        return priceService.getPriceHistoryResponses(productId);
    }
    @GetMapping("/stats/{productId}")
    public PriceStatsResponse getPriceStats(@PathVariable Long productId) {
        return priceService.getPriceStats(productId);
    }
    @GetMapping("/compare/{productId}")
    public List<SellerPriceResponse> comparePrices(@PathVariable Long productId) {
        return priceService.compaPriceResponses(productId);
    }
    @PutMapping("/{id}")
    public PriceHistory updatePrice(@PathVariable Long id, @RequestBody PriceHistory price){
        return priceService.updatePrice(id, price);
    }
    @DeleteMapping("/{id}")
    public String deletePrice(@PathVariable Long id) {
        priceService.deletePrice(id);
        return "Price deleted successfully";
    }
    @DeleteMapping("/product/{productId}")
    public String deletePricesByProduct(@PathVariable Long productId) {
        priceService.deletePricesByProduct(productId);
        return "All prices deleted for product";
    }
}