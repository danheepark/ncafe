package com.new_cafe.app.backend.category.application.port.out;

import com.new_cafe.app.backend.category.domain.Category;
import java.util.List;
import java.util.Optional;

/**
 * [Output Port] 카테고리 로드 포트
 */
public interface LoadCategoryPort {
    List<Category> findAll();
    Optional<Category> findById(Long id);
}
