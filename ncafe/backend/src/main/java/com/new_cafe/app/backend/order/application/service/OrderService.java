package com.new_cafe.app.backend.order.application.service;

import com.new_cafe.app.backend.menu.application.port.out.LoadMenuPort;
import com.new_cafe.app.backend.menu.domain.Menu;
import com.new_cafe.app.backend.order.application.command.CreateOrderCommand;
import com.new_cafe.app.backend.order.application.port.in.PlaceOrderUseCase;
import com.new_cafe.app.backend.order.application.result.OrderResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * [Application Service] 주문 처리 서비스
 */
@Service
@RequiredArgsConstructor
@Transactional
public class OrderService implements PlaceOrderUseCase {

    private final LoadMenuPort loadMenuPort;

    @Override
    public OrderResult placeOrder(CreateOrderCommand command) {
        // 실제 구현에선 DB 저장 로직이 들어가야 하지만, 
        // 이번 요청에선 기능 연결 확인을 위해 총액 계산 로직만 우선 포함합니다.
        int total = command.getItems().stream()
                .mapToInt(item -> {
                    Menu menu = loadMenuPort.findById(item.getMenuId())
                            .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));
                    return menu.getPrice() * item.getQuantity();
                })
                .sum();

        // 가상의 주문 ID 생성
        Long fakeOrderId = Math.abs(UUID.randomUUID().getMostSignificantBits()) % 10000;

        return new OrderResult(fakeOrderId, "PENDING", total);
    }
}
