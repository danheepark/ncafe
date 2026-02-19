package com.new_cafe.app.backend.menu.application.service;

import com.new_cafe.app.backend.menu.application.port.in.GetMenuUseCase;
import com.new_cafe.app.backend.menu.application.port.out.LoadMenuPort;
import com.new_cafe.app.backend.menu.domain.Menu;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * [Application Service] 메뉴 관련 비즈니스 로직
 * 외부에서는 오직 GetMenuUseCase 인터페이스를 통해서만 이 서비스를 사용합니다.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
class MenuService implements GetMenuUseCase {

    private final LoadMenuPort loadMenuPort;

    @Override
    public List<Menu> getAllMenus() {
        return loadMenuPort.findAll();
    }

    @Override
    public Menu getMenuById(Long id) {
        return loadMenuPort.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다. ID: " + id));
    }
}
