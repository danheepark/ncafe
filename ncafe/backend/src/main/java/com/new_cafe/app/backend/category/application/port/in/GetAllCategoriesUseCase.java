package com.new_cafe.app.backend.category.application.port.in;

import com.new_cafe.app.backend.category.application.command.GetCategoriesCommand;
import com.new_cafe.app.backend.category.application.result.CategoryListResult;

/**
 * [Input Port] 카테고리 조회 유스케이스
 */
public interface GetAllCategoriesUseCase {
    CategoryListResult getAllCategories(GetCategoriesCommand command);
}
