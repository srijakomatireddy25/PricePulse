////package com.example.demo.config;
////
////import com.example.demo.entity.Product;
////import com.example.demo.entity.Seller;
////import com.example.demo.entity.PriceHistory;
////import com.example.demo.repository.ProductRepository;
////import com.example.demo.repository.SellerRepository;
////import com.example.demo.repository.PriceHistoryRepository;
////
////import org.springframework.boot.CommandLineRunner;
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////
////import java.time.LocalDateTime;
////
////@Configuration
////public class DataLoader {
////
////    @Bean
////    CommandLineRunner loadData(
////            ProductRepository productRepo,
////            SellerRepository sellerRepo,
////            PriceHistoryRepository priceRepo
////    ) {
////
////        return args -> {
////
////            // PRODUCT
////            Product iphone = new Product();
////            iphone.setName("iPhone 15");
////            iphone.setCategory("Mobile");
////            iphone.setDescription("Apple iPhone 15 128GB");
////
////            productRepo.save(iphone);
////
////            // SELLERS
////            Seller amazon = new Seller();
////            amazon.setName("Amazon");
////            amazon.setWebsite("amazon.in");
////            amazon.setEmail("support@amazon.in");
////
////            Seller flipkart = new Seller();
////            flipkart.setName("Flipkart");
////            flipkart.setWebsite("flipkart.com");
////            flipkart.setEmail("support@flipkart.com");
////
////            Seller reliance = new Seller();
////            reliance.setName("Reliance Digital");
////            reliance.setWebsite("reliancedigital.in");
////            reliance.setEmail("support@reliance.com");
////
////            sellerRepo.save(amazon);
////            sellerRepo.save(flipkart);
////            sellerRepo.save(reliance);
////
////            // PRICE HISTORY
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, amazon,
////                    90000,
////                    LocalDateTime.now().minusDays(5)
////            ));
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, flipkart,
////                    87000,
////                    LocalDateTime.now().minusDays(5)
////            ));
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, reliance,
////                    88000,
////                    LocalDateTime.now().minusDays(5)
////            ));
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, amazon,
////                    86000,
////                    LocalDateTime.now().minusDays(3)
////            ));
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, flipkart,
////                    82000,
////                    LocalDateTime.now().minusDays(3)
////            ));
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, reliance,
////                    85000,
////                    LocalDateTime.now().minusDays(3)
////            ));
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, amazon,
////                    84000,
////                    LocalDateTime.now().minusDays(1)
////            ));
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, flipkart,
////                    76000,
////                    LocalDateTime.now().minusDays(1)
////            ));
////
////            priceRepo.save(new PriceHistory(
////                    null, iphone, reliance,
////                    81000,
////                    LocalDateTime.now().minusDays(1)
////            ));
////            priceRepo.save(new PriceHistory(
////            	    null, iphone, flipkart,
////            	    72000, 
////            	    LocalDateTime.now()
////            	));
////
////        };
////    }
////}
//
//
//package com.example.demo.config;
//
//import com.example.demo.entity.*;
//import com.example.demo.repository.*;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDateTime;
//
//@Configuration
//public class DataLoader {
//
//    @Bean
//    CommandLineRunner loadData(
//            ProductRepository productRepo,
//            SellerRepository sellerRepo,
//            PriceHistoryRepository priceRepo
//    ) {
//
//        return args -> {
//
//            // ✅ Prevent duplicates
//            if (productRepo.count() > 0) {
//                return;
//            }
//
//            Product iphone = new Product();
//            iphone.setName("iPhone 15");
//            iphone.setCategory("Mobile");
//            iphone.setDescription("Apple iPhone 15 128GB");
//
//            productRepo.save(iphone);
//
//            Seller amazon = new Seller(null, "Amazon", "amazon.in", "support@amazon.in");
//            Seller flipkart = new Seller(null, "Flipkart", "flipkart.com", "support@flipkart.com");
//
//            sellerRepo.save(amazon);
//            sellerRepo.save(flipkart);
//
//            priceRepo.save(new PriceHistory(null, iphone, amazon, 90000, LocalDateTime.now()));
//            priceRepo.save(new PriceHistory(null, iphone, flipkart, 87000, LocalDateTime.now()));
//        };
//    }
//}