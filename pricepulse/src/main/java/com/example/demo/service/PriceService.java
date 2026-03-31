package com.example.demo.service;

import com.example.demo.dto.LowestPriceResponse;
import com.example.demo.dto.PriceDropResponse;
import com.example.demo.dto.PriceHistoryResponse;
import com.example.demo.dto.PriceStatsResponse;
import com.example.demo.dto.SellerPriceResponse;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.DoubleSummaryStatistics;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PriceService {

    private final PriceHistoryRepository priceHistoryRepository;
    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;

    public PriceService(
            PriceHistoryRepository priceHistoryRepository,
            ProductRepository productRepository,
            SellerRepository sellerRepository) {

        this.priceHistoryRepository = priceHistoryRepository;
        this.productRepository = productRepository;
        this.sellerRepository = sellerRepository;
    }

    public PriceHistory addPrice(Long productId, Long sellerId, double price){

        Product product = productRepository.findById(productId).orElseThrow();
        Seller seller = sellerRepository.findById(sellerId).orElseThrow();

        List<PriceHistory> previousPrices =
                priceHistoryRepository.findByProductId(productId);

        if(!previousPrices.isEmpty()){

            double lastPrice =
                    previousPrices.get(previousPrices.size()-1).getPrice();

            if(price < lastPrice){
                System.out.println("PRICE DROP DETECTED for product: " + product.getName());
            }
        }

        PriceHistory history = new PriceHistory();
        history.setProduct(product);
        history.setSeller(seller);
        history.setPrice(price);
        history.setRecordedAt(java.time.LocalDateTime.now());

        return priceHistoryRepository.save(history);
    }

    public List<PriceHistory> getPriceHistory(Long productId){
        return priceHistoryRepository.findByProductId(productId);
    }
    public List<PriceHistory> comparePrices(Long productId){
        return priceHistoryRepository.findByProductId(productId);
    }
    public LowestPriceResponse getLowestPrice(Long productId) {

        PriceHistory lowest = priceHistoryRepository
                .findTopByProductIdOrderByPriceAsc(productId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No price found"));

        return new LowestPriceResponse(
                productId,
                lowest.getSeller().getName(),
                lowest.getPrice()
        );
    }
    public List<PriceDropResponse> detectPriceDrops(Long productId) {

        List<PriceHistory> prices =
                priceHistoryRepository.findByProductIdOrderByRecordedAtAsc(productId);

        Map<Long, Double> lastSellerPrice = new LinkedHashMap<>();

        Map<Long, PriceDropResponse> latestDrops = new LinkedHashMap<>();

        for (PriceHistory current : prices) {

            Long sellerId = current.getSeller().getId();

            if (lastSellerPrice.containsKey(sellerId)) {

                Double oldPrice = lastSellerPrice.get(sellerId);

                if (current.getPrice() < oldPrice) {

                    latestDrops.put(
                        sellerId,
                        new PriceDropResponse(
                            current.getProduct().getName(),
                            current.getSeller().getName(),
                            oldPrice,
                            current.getPrice()
                        )
                    );
                }
            }

            lastSellerPrice.put(sellerId, current.getPrice());
        }
        return latestDrops.values()
                .stream()
                .sorted((a, b) -> Double.compare(
                        (b.getOldPrice() - b.getNewPrice()),
                        (a.getOldPrice() - a.getNewPrice())
                ))
                .collect(Collectors.toList());
    }
    public List<PriceHistoryResponse> getPriceHistoryResponses(Long productId) {

        List<PriceHistory> prices =
                priceHistoryRepository.findByProductIdOrderByRecordedAtAsc(productId);

        return prices.stream()
        	    .map(p -> new PriceHistoryResponse(
        	        p.getPrice(),
        	        p.getRecordedAt(),
        	        p.getSeller().getName()  
        	    ))
        	    .collect(Collectors.toList());
    }

    public PriceStatsResponse getPriceStats(Long productId) {

        List<PriceHistory> prices =
                priceHistoryRepository.findByProductIdOrderByRecordedAtAsc(productId);

        DoubleSummaryStatistics stats = prices.stream()
                .mapToDouble(PriceHistory::getPrice)
                .summaryStatistics();

        // 🔥 ADD THIS LOGIC
        double priceChangePercentage = 0;

        if (prices.size() >= 2) {

            double oldestPrice = prices.get(0).getPrice();
            double latestPrice = prices.get(prices.size() - 1).getPrice();

            if (oldestPrice != 0) {
                priceChangePercentage =
                        ((latestPrice - oldestPrice) / oldestPrice) * 100;
            }
        }

        
        return new PriceStatsResponse(
                productId,
                stats.getMin(),
                stats.getMax(),
                stats.getAverage(),
                priceChangePercentage
        );
    }
    public List<SellerPriceResponse> compaPriceResponses(Long productId) {

        List<PriceHistory> prices =
                priceHistoryRepository.findByProductIdOrderByRecordedAtDesc(productId);

        Map<Long, SellerPriceResponse> latestPrices = new LinkedHashMap<>();

        for (PriceHistory p : prices) {

            Long sellerId = p.getSeller().getId();

            if (!latestPrices.containsKey(sellerId)) {
                latestPrices.put(
                        sellerId,
                        new SellerPriceResponse(
                                p.getSeller().getName(),
                                p.getPrice()
                        )
                );
            }
        }

        return new ArrayList<>(latestPrices.values());
    }
    public PriceHistory updatePrice(Long id, PriceHistory updatedPrice){

        PriceHistory price = priceHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Price not found"));

        if(updatedPrice.getPrice() != 0){
            price.setPrice(updatedPrice.getPrice());
        }

        if(updatedPrice.getRecordedAt() != null){
            price.setRecordedAt(updatedPrice.getRecordedAt());
        }

        if(updatedPrice.getProduct() != null){
            price.setProduct(updatedPrice.getProduct());
        }

        if(updatedPrice.getSeller() != null){
            price.setSeller(updatedPrice.getSeller());
        }

        return priceHistoryRepository.save(price);
    }
 // DELETE single price by ID
    public void deletePrice(Long id) {
        PriceHistory price = priceHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Price not found"));

        priceHistoryRepository.delete(price);
    }
 // DELETE all prices of a product
    public void deletePricesByProduct(Long productId) {
        priceHistoryRepository.deleteByProductId(productId);
    }
}