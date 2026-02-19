package com.new_cafe.app.backend.category.adapter.out.persistence;

import com.new_cafe.app.backend.category.domain.Category;
import org.springframework.stereotype.Component;

/**
 * [Persistence Mapper] Category
 */
@Component
class CategoryPersistenceMapper {

    public Category toDomain(CategoryJpaEntity entity) {
        if (entity == null) return null;

        return Category.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .sortOrder(entity.getSortOrder())
                .build();
    }

    public CategoryJpaEntity toEntity(Category domain) {
        if (domain == null) return null;

        return CategoryJpaEntity.builder()
                .id(domain.getId())
                .name(domain.getName())
                .icon(domain.getIcon())
                .sortOrder(domain.getSortOrder())
                .build();
    }
}
