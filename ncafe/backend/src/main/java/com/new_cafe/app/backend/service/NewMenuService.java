package com.new_cafe.app.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.new_cafe.app.backend.dto.MenuCreateRequest;
import com.new_cafe.app.backend.dto.MenuCreateResponse;
import com.new_cafe.app.backend.dto.MenuDetailResponse;
import com.new_cafe.app.backend.dto.MenuListRequest;
import com.new_cafe.app.backend.dto.MenuListResponse;
import com.new_cafe.app.backend.dto.MenuImageListResponse;
import com.new_cafe.app.backend.dto.MenuUpdateRequest;
import com.new_cafe.app.backend.entity.Menu;
import com.new_cafe.app.backend.entity.MenuImage;
import com.new_cafe.app.backend.repository.MenuRepository;
import com.new_cafe.app.backend.repository.MenuImageRepository;
import com.new_cafe.app.backend.dto.MenuImageResponse;
import com.new_cafe.app.backend.dto.MenuResponse;

@Service
public class NewMenuService implements MenuService {

    private final MenuRepository menuRepository;
    private final MenuImageRepository menuImageRepository;

    public NewMenuService(MenuRepository menuRepository,
            MenuImageRepository menuImageRepository) {
        this.menuRepository = menuRepository;
        this.menuImageRepository = menuImageRepository;

    }

    @Override
    public MenuListResponse getMenus(MenuListRequest request) {
        Integer categoryId = request.getCategoryId();
        String searchQuery = request.getSearchQuery();

        List<Menu> menus;
        if (searchQuery != null && !searchQuery.isEmpty() && categoryId != null) {
            menus = menuRepository.findAllByCategoryAndSearchQuery(categoryId, searchQuery);
        } else if (searchQuery != null && !searchQuery.isEmpty()) {
            menus = menuRepository.findAllByName(searchQuery);
        } else if (categoryId != null) {
            menus = menuRepository.findAllByCategoryId(categoryId);
        } else {
            menus = menuRepository.findAllByCategoryId(null);
        }

        List<MenuResponse> menuResponses = menus
                .stream()
                .map(menu -> {
                    // TODO: 성능 향상을 위해 이미지 조인 쿼리 도입 권장
                    // 우선은 기존 로직을 유지하되, 이미지가 없을 경우의 기본값을 안전하게 처리합니다.
                    String imageSrc = "blank.png";
                    try {
                        List<MenuImage> images = menuImageRepository.findAllByMenuId(menu.getId());
                        if (images != null && !images.isEmpty()) {
                            imageSrc = images.get(0).getSrcUrl();
                        }
                    } catch (Exception e) {
                        // DB 테이블이 없거나 쿼리 실패 시 기본 이미지 사용 (504 타임아웃 방지)
                        System.err.println("Menu image fetch failed for menu " + menu.getId() + ": " + e.getMessage());
                    }

                    String categoryName = "기타";
                    if (menu.getCategory() != null) {
                        categoryName = menu.getCategory().getName();
                    }

                    return MenuResponse.builder()
                            .id(menu.getId())
                            .korName(menu.getKorName())
                            .engName(menu.getEngName())
                            .description(menu.getDescription())
                            .price(menu.getPrice() != null ? parsePrice(menu.getPrice()) : 0)
                            .categoryName(categoryName)
                            .imageSrc(imageSrc)
                            .isAvailable(menu.getIsAvailable() != null ? menu.getIsAvailable() : true)
                            .isSoldOut(false)
                            .sortOrder(1)
                            .createdAt(menu.getCreatedAt())
                            .updatedAt(menu.getUpdatedAt())
                            .build();
                })
                .toList();

        return MenuListResponse.builder()
                .menus(menuResponses)
                .total(menuResponses.size())
                .build();
    }

    @Override
    public MenuDetailResponse getMenu(Long id) {
        Menu menu = menuRepository.findById(id);
        if (menu == null) {
            return null;
        }

        List<MenuImage> images = menuImageRepository.findAllByMenuId(menu.getId());
        String imageSrc = "blank.png";
        if (images != null && !images.isEmpty()) {
            imageSrc = images.get(0).getSrcUrl();
        }

        String categoryName = "기타";
        if (menu.getCategory() != null) {
            categoryName = menu.getCategory().getName();
        }

        return MenuDetailResponse.builder()
                .id(menu.getId())
                .korName(menu.getKorName())
                .engName(menu.getEngName())
                .description(menu.getDescription())
                .price(menu.getPrice() != null ? parsePrice(menu.getPrice()) : 0)
                .categoryId(menu.getCategoryId())
                .categoryName(categoryName)
                .imageSrc(imageSrc)
                .isAvailable(menu.getIsAvailable() != null ? menu.getIsAvailable() : true)
                .createdAt(menu.getCreatedAt())
                .updatedAt(menu.getUpdatedAt())
                .build();
    }

    @Override
    public MenuImageListResponse getMenuImages(Long id) {
        Menu menu = menuRepository.findById(id);
        List<MenuImage> images = menuImageRepository.findAllByMenuId(id);

        String altText = "";
        if (menu != null) {
            altText = menu.getKorName();
            if (menu.getDescription() != null && !menu.getDescription().isEmpty()) {
                altText += " - " + menu.getDescription();
            }
        }

        final String finalAltText = altText;
        List<MenuImageResponse> responses = images != null ? images.stream()
                .map(img -> MenuImageResponse.builder()
                        .id(img.getId())
                        .menuId(img.getMenuId())
                        .srcUrl(img.getSrcUrl())
                        .createdAt(img.getCreatedAt())
                        .sortOrder(img.getSortOrder())
                        .altText(finalAltText)
                        .build())
                .toList() : List.of();

        return MenuImageListResponse.builder()
                .images(responses)
                .build();
    }

    @Override
    public MenuCreateResponse createMenu(MenuCreateRequest request) {
        return null; // 구현 예정
    }

    @Override
    public void deleteMenu(Long id) {
        // 구현 예정
    }

    @Override
    public MenuUpdateRequest updateMenu(MenuUpdateRequest request) {
        return null; // 구현 예정
    }

    private int parsePrice(String price) {
        if (price == null || price.trim().isEmpty()) {
            return 0;
        }
        try {
            // 소수점 이하 제거 및 숫자만 추출
            String cleanPrice = price.trim();
            if (cleanPrice.contains(".")) {
                cleanPrice = cleanPrice.split("\\.")[0];
            }
            cleanPrice = cleanPrice.replaceAll("[^0-9]", "");
            return cleanPrice.isEmpty() ? 0 : Integer.parseInt(cleanPrice);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

}
