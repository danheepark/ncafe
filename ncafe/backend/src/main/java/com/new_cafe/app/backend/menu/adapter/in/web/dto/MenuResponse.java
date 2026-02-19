package com.new_cafe.app.backend.menu.adapter.in.web.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.new_cafe.app.backend.category.domain.Category;
import com.new_cafe.app.backend.menu.domain.Menu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuResponse {
    private Long id;
    private String korName;
    private String engName;
    private String description;
    private int price;
    private String image;
    private String imageSrc;
    private Category category;
    private String categoryName;
    private Boolean isAvailable;
    private Boolean isSoldOut;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static MenuResponse from(Menu m) {
        return MenuResponse.builder()
                .id(m.getId())
                .korName(m.getKorName())
                .engName(m.getEngName())
                .description(m.getDescription())
                .price(m.getPrice() != null ? m.getPrice() : 0)
                .category(m.getCategory())
                .isAvailable(m.getIsAvailable())
                .createdAt(m.getCreatedAt())
                .updatedAt(m.getUpdatedAt())
                .isSoldOut(false)
                .sortOrder(0)
                .image(null)
                .build();
    }

    private static int parsePrice(String price) {
        if (price == null || price.trim().isEmpty()) {
            return 0;
        }
        try {
            String cleanPrice = price.trim();
            if (cleanPrice.contains(".")) {
                cleanPrice = cleanPrice.split("\\.")[0];
            }
            cleanPrice = cleanPrice.replaceAll("[^0-9]", "");
            return cleanPrice.isEmpty() ? 0 : Integer.parseInt(cleanPrice);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}