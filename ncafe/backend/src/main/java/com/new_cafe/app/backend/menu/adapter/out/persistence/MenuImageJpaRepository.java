package com.new_cafe.app.backend.menu.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

interface MenuImageJpaRepository extends JpaRepository<MenuImageJpaEntity, Long> {
    List<MenuImageJpaEntity> findAllByMenuId(Long menuId);
}
