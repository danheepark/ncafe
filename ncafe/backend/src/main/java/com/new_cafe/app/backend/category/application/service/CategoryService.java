package com.new_cafe.app.backend.category.application.service;

import com.new_cafe.app.backend.category.application.command.GetCategoriesCommand;
import com.new_cafe.app.backend.category.application.port.in.GetAllCategoriesUseCase;
import com.new_cafe.app.backend.category.application.port.out.LoadCategoryPort;
import com.new_cafe.app.backend.category.application.result.CategoryListResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * [Application Service] 카테고리 서비스
 */
@Service("customerCategoryService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
class CategoryService implements GetAllCategoriesUseCase {

    private final LoadCategoryPort loadCategoryPort;

    @Override
    public CategoryListResult getAllCategories(GetCategoriesCommand command) {
        return CategoryListResult.from(loadCategoryPort.findAll());
    }
}
