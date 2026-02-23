package com.new_cafe.app.backend.admin.menu.adapter.out.persistence;

import com.new_cafe.app.backend.admin.menu.application.port.out.MenuPort;
import com.new_cafe.app.backend.menu.adapter.out.persistence.MenuJpaEntity;
import com.new_cafe.app.backend.menu.adapter.out.persistence.MenuJpaRepository;
import com.new_cafe.app.backend.menu.adapter.out.persistence.MenuPersistenceMapper;
import com.new_cafe.app.backend.menu.domain.Menu;
import com.new_cafe.app.backend.category.adapter.out.persistence.CategoryJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * [Persistence Adapter] 관리자용 메뉴 영속성 어댑터
 */
@Component("adminMenuPersistenceAdapter")
@RequiredArgsConstructor
class MenuPersistenceAdapter implements MenuPort {

    private final MenuJpaRepository menuJpaRepository;
    private final com.new_cafe.app.backend.menu.adapter.out.persistence.MenuImageJpaRepository menuImageJpaRepository;
    private final CategoryJpaRepository categoryJpaRepository;
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
    public List<com.new_cafe.app.backend.menu.domain.MenuImage> findImagesByMenuId(Long menuId) {
        return menuImageJpaRepository.findAllByMenuId(menuId).stream()
                .map(mapper::toDomainImage)
                .collect(Collectors.toList());
    }

    @Override
    public Menu save(Menu menu) {
        MenuJpaEntity entity = MenuJpaEntity.builder()
                .id(menu.getId())
                .korName(menu.getKorName())
                .engName(menu.getEngName())
                .description(menu.getDescription())
                .price(menu.getPrice() != null ? String.valueOf(menu.getPrice()) : "0")
                .isAvailable(menu.getIsAvailable())
                .category(menu.getCategoryId() != null ? 
                        categoryJpaRepository.findById(menu.getCategoryId()).orElse(null) : null)
                .build();
        
        MenuJpaEntity saved = menuJpaRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public void deleteById(Long id) {
        menuJpaRepository.deleteById(id);
    }
}
