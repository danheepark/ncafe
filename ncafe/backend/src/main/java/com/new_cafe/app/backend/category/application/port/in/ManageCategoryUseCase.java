package com.new_cafe.app.backend.category.application.port.in;

import com.new_cafe.app.backend.category.domain.Category;
import java.util.List;

/**
 * [Input Port] 카테고리 관리/조회 유스케이스
 */
public interface ManageCategoryUseCase {
    List<Category> getAllCategories();
}
