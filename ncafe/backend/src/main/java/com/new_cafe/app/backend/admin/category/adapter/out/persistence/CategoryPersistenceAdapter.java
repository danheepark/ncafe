package com.new_cafe.app.backend.admin.category.adapter.out.persistence;

import com.new_cafe.app.backend.admin.category.application.port.out.CategoryPort;
import com.new_cafe.app.backend.category.adapter.out.persistence.CategoryJpaEntity;
import com.new_cafe.app.backend.category.adapter.out.persistence.CategoryJpaRepository;
import com.new_cafe.app.backend.category.domain.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component("adminCategoryPersistenceAdapter")
@RequiredArgsConstructor
class CategoryPersistenceAdapter implements CategoryPort {

    private final CategoryJpaRepository categoryJpaRepository;

    @Override
    public List<Category> findAll() {
        return categoryJpaRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryJpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public Category save(Category category) {
        CategoryJpaEntity entity = CategoryJpaEntity.builder()
                .id(category.getId())
                .name(category.getName())
                .icon(category.getIcon())
                .sortOrder(category.getSortOrder())
                .build();
        return toDomain(categoryJpaRepository.save(entity));
    }

    @Override
    public void deleteById(Long id) {
        categoryJpaRepository.deleteById(id);
    }

    private Category toDomain(CategoryJpaEntity entity) {
        return Category.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .sortOrder(entity.getSortOrder())
                .build();
    }
}
