package com.new_cafe.app.backend.menu.adapter.out.persistence;

import com.new_cafe.app.backend.category.adapter.out.persistence.CategoryJpaEntity;
import com.new_cafe.app.backend.category.domain.Category;
import com.new_cafe.app.backend.menu.domain.Menu;
import com.new_cafe.app.backend.menu.domain.MenuImage;
import org.springframework.stereotype.Component;

/**
 * [Persistence Mapper]
 * 외부 계층인 JPA Entity와 내부 계층인 Domain Model을 변환합니다.
 */
@Component
class MenuPersistenceMapper {

    public Menu toDomain(MenuJpaEntity entity) {
        if (entity == null) return null;

        return Menu.builder()
                .id(entity.getId())
                .korName(entity.getKorName())
                .engName(entity.getEngName())
                .description(entity.getDescription())
                .price(parsePriceToInt(entity.getPrice()))
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .category(toDomainCategory(entity.getCategory()))
                .isAvailable(entity.getIsAvailable())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    private Category toDomainCategory(CategoryJpaEntity entity) {
        if (entity == null) return null;
        return Category.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .sortOrder(entity.getSortOrder())
                .build();
    }

    public MenuImage toDomainImage(MenuImageJpaEntity entity) {
        if (entity == null) return null;
        return MenuImage.builder()
                .id(entity.getId())
                .menuId(entity.getMenuId())
                .srcUrl(entity.getSrcUrl())
                .createdAt(entity.getCreatedAt())
                .sortOrder(entity.getSortOrder())
                .build();
    }

    private Integer parsePriceToInt(String price) {
        if (price == null || price.isBlank()) return 0;
        try {
            return Integer.parseInt(price.replaceAll("[^0-9]", ""));
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
