package com.example.demo.service;

import com.example.demo.entity.Seller;
import com.example.demo.repository.PriceHistoryRepository;
import com.example.demo.repository.SellerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SellerService {

    private final PriceHistoryRepository priceHistoryRepository;

    private final SellerRepository sellerRepository;

    public SellerService(SellerRepository sellerRepository, PriceHistoryRepository priceHistoryRepository){
        this.sellerRepository = sellerRepository;
        this.priceHistoryRepository = priceHistoryRepository;
    }

    public Seller saveSeller(Seller seller){
        return sellerRepository.save(seller);
    }

    public List<Seller> getAllSellers(){
        return sellerRepository.findAll();
    }
    @Transactional
    public void deleteSeller(Long id) {

        if (!sellerRepository.existsById(id)) {
            throw new RuntimeException("Seller not found");
        }
        priceHistoryRepository.deleteBySellerId(id);

        sellerRepository.deleteById(id);
    }
    public Seller updateSeller(Long id, Seller updatedSeller){

        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        seller.setName(updatedSeller.getName());
        seller.setWebsite(updatedSeller.getWebsite());
        seller.setEmail(updatedSeller.getEmail());

        return sellerRepository.save(seller);
    }
    
}