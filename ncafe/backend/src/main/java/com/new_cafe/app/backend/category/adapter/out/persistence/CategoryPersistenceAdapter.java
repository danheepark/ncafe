package com.new_cafe.app.backend.category.adapter.out.persistence;

import com.new_cafe.app.backend.category.application.port.out.LoadCategoryPort;
import com.new_cafe.app.backend.category.domain.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * [Persistence Adapter] Category
 */
@Component("customerCategoryPersistenceAdapter")
@RequiredArgsConstructor
class CategoryPersistenceAdapter implements LoadCategoryPort {

    private final CategoryJpaRepository categoryJpaRepository;
    private final CategoryPersistenceMapper mapper;

    @Override
    public List<Category> findAll() {
        return categoryJpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryJpaRepository.findById(id)
                .map(mapper::toDomain);
    }
}
