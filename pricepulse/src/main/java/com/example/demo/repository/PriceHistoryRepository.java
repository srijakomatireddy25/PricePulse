package com.example.demo.repository;

import com.example.demo.entity.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {

    List<PriceHistory> findByProductId(Long productId);

    Optional<PriceHistory> findTopByProductIdOrderByPriceAsc(Long productId);
    List<PriceHistory> findByProductIdOrderByRecordedAtDesc(Long productId);

    List<PriceHistory> findByProductIdOrderByRecordedAtAsc(Long productId);
    void deleteByProductId(Long productId);
    void deleteBySellerId(Long sellerId);
    void deleteById(Long id);
}