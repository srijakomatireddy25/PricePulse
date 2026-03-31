package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.PriceHistoryRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final PriceHistoryRepository priceHistoryRepository;

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository, PriceHistoryRepository priceHistoryRepository){
        this.productRepository = productRepository;
        this.priceHistoryRepository = priceHistoryRepository;
    }

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProductById(Long id){
        return productRepository.findById(id).orElseThrow();
    }

    @Transactional
    public void deleteProduct(Long id){

        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }

        priceHistoryRepository.deleteByProductId(id);

        // 🔥 THEN DELETE PRODUCT
        productRepository.deleteById(id);
    }
    public Product updateProduct(Long id, Product updatedProduct){

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setCategory(updatedProduct.getCategory());
        product.setDescription(updatedProduct.getDescription());
        return productRepository.save(product);
    }
}