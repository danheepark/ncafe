package com.new_cafe.app.backend.category.application.service;

import com.new_cafe.app.backend.category.application.port.in.ManageCategoryUseCase;
import com.new_cafe.app.backend.category.application.port.out.LoadCategoryPort;
import com.new_cafe.app.backend.category.domain.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * [Application Service] Category
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
class CategoryService implements ManageCategoryUseCase {

    private final LoadCategoryPort loadCategoryPort;

    @Override
    public List<Category> getAllCategories() {
        return loadCategoryPort.findAll();
    }
}
