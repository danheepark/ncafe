package com.new_cafe.app.backend.admin.menu.adapter.in.web;

import com.new_cafe.app.backend.admin.menu.adapter.in.web.dto.*;
import com.new_cafe.app.backend.admin.menu.application.command.*;
import com.new_cafe.app.backend.admin.menu.application.port.in.ManageMenuUseCase;
import com.new_cafe.app.backend.admin.menu.application.result.MenuListResult;
import com.new_cafe.app.backend.admin.menu.application.result.MenuResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * [Web Adapter] 관리자용 메뉴 관리 API 리팩토링
 */
@RestController("adminMenuController")
@RequestMapping("/admin/menus")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MenuController {

    private final ManageMenuUseCase manageMenuUseCase;

    @GetMapping
    public MenuListWebResponse getAllMenus() {
        MenuListResult result = manageMenuUseCase.getMenus(new GetMenusCommand());
        return MenuListWebResponse.from(result);
    }

    @GetMapping("/{id}")
    public MenuWebResponse getMenu(@PathVariable Long id) {
        MenuResult result = manageMenuUseCase.getMenu(new GetMenuCommand(id));
        return MenuWebResponse.from(result);
    }

    @PostMapping
    public MenuWebResponse createMenu(@RequestBody MenuCreateWebRequest request) {
        MenuResult result = manageMenuUseCase.createMenu(request.toCommand());
        return MenuWebResponse.from(result);
    }

    @PutMapping("/{id}")
    public MenuWebResponse updateMenu(@PathVariable Long id, @RequestBody MenuUpdateWebRequest request) {
        MenuResult result = manageMenuUseCase.updateMenu(request.toCommand(id));
        return MenuWebResponse.from(result);
    }

    @DeleteMapping("/{id}")
    public void deleteMenu(@PathVariable Long id) {
        manageMenuUseCase.deleteMenu(new DeleteMenuCommand(id));
    }
}
