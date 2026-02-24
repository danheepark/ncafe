package com.new_cafe.app.backend.menu.adapter.in.web;

import com.new_cafe.app.backend.menu.application.command.GetMenuCommand;
import com.new_cafe.app.backend.menu.application.command.GetMenusCommand;
import com.new_cafe.app.backend.menu.application.port.in.GetMenuUseCase;
import com.new_cafe.app.backend.menu.application.result.MenuListResult;
import com.new_cafe.app.backend.menu.application.result.MenuResult;
import com.new_cafe.app.backend.menu.adapter.in.web.dto.MenuWebResponse;
import com.new_cafe.app.backend.menu.adapter.in.web.dto.MenuListWebResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * [Web Adapter] 손님용 메뉴 조회 API
 * 
 * 🆕 필터링 및 검색 기능을 지원합니다.
 */
@RestController("customerMenuController")
@RequestMapping("/menus") // /api 접두어 제거 (Proxy에서 처리)
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MenuController {

    private final GetMenuUseCase getMenuUseCase;

    @GetMapping
    public MenuListWebResponse getMenus(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String search) {
        
        GetMenusCommand command = new GetMenusCommand(categoryId, search);
        MenuListResult result = getMenuUseCase.getMenus(command);
        return MenuListWebResponse.from(result);
    }

    @GetMapping("/{id}")
    public MenuWebResponse getMenu(@PathVariable Long id) {
        MenuResult result = getMenuUseCase.getMenu(new GetMenuCommand(id));
        return MenuWebResponse.from(result);
    }
}
