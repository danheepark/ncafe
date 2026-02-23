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
 * [Persistence Adapter] 일반 사용자용 메뉴 로드 어댑터
 */
@Component("customerMenuPersistenceAdapter")
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
    public List<Menu> findByCondition(Long categoryId, String searchQuery) {
        // 간단한 필터링 로직 구현 (실무에선 QueryDSL 등을 권장하지만, 우선 Java Stream으로 구현)
        return menuJpaRepository.findAll().stream()
                .filter(entity -> categoryId == null || (entity.getCategory() != null && entity.getCategory().getId().equals(categoryId)))
                .filter(entity -> searchQuery == null || entity.getKorName().contains(searchQuery) || (entity.getEngName() != null && entity.getEngName().toLowerCase().contains(searchQuery.toLowerCase())))
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Menu> findById(Long id) {
        return menuJpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<MenuImage> findImagesByMenuId(Long menuId) {
        return menuImageJpaRepository.findAllByMenuId(menuId).stream()
                .map(mapper::toDomainImage)
                .collect(Collectors.toList());
    }
}
