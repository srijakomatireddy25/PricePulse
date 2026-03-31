package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.entity.Seller;
import com.example.demo.service.SellerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    private final SellerService sellerService;

    public SellerController(SellerService sellerService){
        this.sellerService = sellerService;
    }

    @PostMapping
    public Seller addSeller(@RequestBody Seller seller){
        return sellerService.saveSeller(seller);
    }

    @GetMapping
    public List<Seller> getSellers(){
        return sellerService.getAllSellers();
    }
    @DeleteMapping("/{id}")
    public String deleteSeller(@PathVariable Long id){
        sellerService.deleteSeller(id);
        return "Seller deleted successfully";
    }
    @PutMapping("/{id}")
    public String updateSeller(@PathVariable Long id, @RequestBody Seller seller){
        sellerService.updateSeller(id, seller);
        return "Seller updated successfully";
    }
}