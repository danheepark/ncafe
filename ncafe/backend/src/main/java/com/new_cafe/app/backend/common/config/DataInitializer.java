package com.new_cafe.app.backend.common.config;

import com.new_cafe.app.backend.category.adapter.out.persistence.CategoryJpaEntity;
import com.new_cafe.app.backend.category.adapter.out.persistence.CategoryJpaRepository;
import com.new_cafe.app.backend.menu.adapter.out.persistence.MenuImageJpaEntity;
import com.new_cafe.app.backend.menu.adapter.out.persistence.MenuImageJpaRepository;
import com.new_cafe.app.backend.menu.adapter.out.persistence.MenuJpaEntity;
import com.new_cafe.app.backend.menu.adapter.out.persistence.MenuJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryJpaRepository categoryRepository;
    private final MenuJpaRepository menuRepository;
    private final MenuImageJpaRepository menuImageRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (categoryRepository.count() > 0) return;

        // 1. 카테고리 생성
        CategoryJpaEntity coffee = CategoryJpaEntity.builder().name("Coffee").icon("☕").sortOrder(1).build();
        CategoryJpaEntity nonCoffee = CategoryJpaEntity.builder().name("Non-Coffee").icon("🥤").sortOrder(2).build();
        CategoryJpaEntity dessert = CategoryJpaEntity.builder().name("Bakery & Dessert").icon("🍰").sortOrder(3).build();
        CategoryJpaEntity sandwich = CategoryJpaEntity.builder().name("Sandwich & Bagel").icon("🥪").sortOrder(4).build();
        
        categoryRepository.saveAll(List.of(coffee, nonCoffee, dessert, sandwich));

        // 2. 메뉴 생성 - Coffee
        createMenu(coffee, "아메리카노", "Americano", "상큼한 산미와 고소한 풍미가 어우러진 깔끔한 블랙 커피", "4500", "americano.png");
        createMenu(coffee, "카페라떼", "Cafe Latte", "부드러운 우유와 진한 에스프레소가 만난 고소한 라떼", "5000", "cafelatte.png");
        createMenu(coffee, "카푸치노", "Cappuccino", "풍부한 우유 거품과 시나몬 가루가 어우러진 클래식 커피", "5000", "capuchino.png");
        createMenu(coffee, "카라멜 마끼아또", "Caramel Macchiato", "달콤한 카라멜 시럽과 부드러운 우유 거품의 조화", "5500", "caramelMacchiato.png");
        createMenu(coffee, "헤이즐넛 라떼", "Hazelnut Latte", "헤이즐넛의 고소한 풍미가 가득한 달콤한 라떼", "5500", "hazelnutlatte.png");
        createMenu(coffee, "바닐라 라떼", "Vanilla Latte", "바닐라 빈의 깊은 풍미가 느껴지는 부드러운 단맛", "5500", "vanilla-latte.png");
        createMenu(coffee, "카페모카", "Cafe Mocha", "진한 초콜릿의 달콤함과 에스프레소의 조화", "5500", "chocolatelatte.png");

        // 3. 메뉴 생성 - Non-Coffee
        createMenu(nonCoffee, "아이스티", "Iced Tea", "시원하고 달콤한 복숭아 향이 가득한 아이스티", "4000", "icedtea.png");
        createMenu(nonCoffee, "레몬에이드", "Lemonade", "톡 쏘는 탄산과 상큼한 레몬즙이 만난 청량한 에이드", "5000", "lemonade.png");
        createMenu(nonCoffee, "딸기 스무디", "Strawberry Smoothie", "신선한 딸기를 듬뿍 넣어 갈아 만든 시원한 스무디", "6000", "strawberrysmoothie.png");
        createMenu(nonCoffee, "시그니처 에이드", "Signature Aide", "N.CAFE만의 특별한 레시피로 만든 대표 에이드", "6000", "signature.png");

        // 4. 메뉴 생성 - Bakery & Dessert
        createMenu(dessert, "딸기 케이크", "Strawberry Cake", "부드러운 생크림과 달콤한 딸기가 층층이 쌓인 케이크", "7500", "strawberryCake.png");
        createMenu(dessert, "티라미수", "Tiramisu", "마스카포네 치즈와 에스프레소 향이 가득한 이탈리아 대표 디저트", "7000", "tiramisu.png");
        createMenu(dessert, "초콜릿 무스", "Chocolate Mousse", "입안에서 사르르 녹는 진한 초콜릿의 풍미", "6500", "chocolateMousse.png");
        createMenu(dessert, "초콜릿 크루아상", "Chocolate Croissant", "바삭한 겹겹의 식감 속에 달콤한 초콜릿이 가득", "4800", "chocolateCroissant.png");
        createMenu(dessert, "버터 쿠키", "Butter Cookie", "고소한 버터 향이 일품인 바삭한 수제 쿠키", "3500", "butterCookie.png");
        createMenu(dessert, "초코칩 쿠키", "Choco Chip Cookie", "큼직한 초코칩이 듬뿍 들어간 달콤한 쿠키", "3500", "chocoChipCookie.png");

        // 5. 메뉴 생성 - Sandwich & Bagel
        createMenu(sandwich, "햄치즈 샌드위치", "Ham & Cheese Sandwich", "신선한 채소와 고소한 햄, 치즈가 어우러진 클래식 샌드위치", "6500", "hamCheeseSandwich.png");
        createMenu(sandwich, "에그 스크램블 샌드위치", "Egg Scramble Sandwich", "부드러운 에그 스크램블이 듬뿍 들어간 한 끼 식사", "6800", "scrambledEggSandwich.png");
        createMenu(sandwich, "튜나 샌드위치", "Tuna Sandwich", "고소한 마요네즈와 담백한 참치가 어우러진 샌드위치", "7000", "tunaSandwich.png");
        createMenu(sandwich, "터키 샌드위치", "Turkey Sandwich", "담백한 터키 슬라이스와 신선한 채소의 조화", "7500", "turkeySandwich.png");
        createMenu(sandwich, "비프 베이글", "Beef Bagel", "쫄깃한 베이글 사이에 짭조름한 소고기가 가득", "8000", "beefBagel.png");
    }

    private void createMenu(CategoryJpaEntity category, String korName, String engName, String description, String price, String imageUrl) {
        MenuJpaEntity menu = MenuJpaEntity.builder()
                .category(category)
                .korName(korName)
                .engName(engName)
                .description(description)
                .price(price)
                .isAvailable(true)
                .build();
        menuRepository.save(menu);

        MenuImageJpaEntity image = MenuImageJpaEntity.builder()
                .menuId(menu.getId())
                .srcUrl(imageUrl)
                .sortOrder(1)
                .build();
        menuImageRepository.save(image);
    }
}
