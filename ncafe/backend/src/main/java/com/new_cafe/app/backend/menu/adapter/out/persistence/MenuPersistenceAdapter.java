package com.new_cafe.app.backend.menu.adapter.out.persistence;

import com.new_cafe.app.backend.menu.application.port.out.LoadMenuPort;
import com.new_cafe.app.backend.menu.domain.Menu;
import com.new_cafe.app.backend.menu.domain.MenuImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * [Persistence Adapter]
 * LoadMenuPort를 구현하여 도메인 계층에 데이터를 제공합니다.
 */
@Component
@RequiredArgsConstructor
class MenuPersistenceAdapter implements LoadMenuPort {

    private final MenuJpaRepository menuJpaRepository;
    private final MenuImageJpaRepository menuImageJpaRepository;
    private final MenuPersistenceMapper mapper;

    @Override
    public List<Menu> findAll() {
        return menuJpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Menu> findById(Long id) {
        return menuJpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<Menu> findByCategoryId(Long categoryId) {
        return menuJpaRepository.findAll().stream()
                .filter(entity -> entity.getCategory() != null && entity.getCategory().getId().equals(categoryId))
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<MenuImage> findImagesByMenuId(Long menuId) {
        return menuImageJpaRepository.findAllByMenuId(menuId).stream()
                .map(mapper::toDomainImage)
                .collect(Collectors.toList());
    }
}
