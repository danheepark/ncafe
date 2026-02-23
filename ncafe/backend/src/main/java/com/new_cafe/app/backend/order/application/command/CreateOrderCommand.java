package com.new_cafe.app.backend.order.application.command;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

/**
 * [Command] 주문 생성 커맨드
 */
@Getter
@Builder
public class CreateOrderCommand {
    private final List<OrderItemCommand> items;

    @Getter
    @Builder
    public static class OrderItemCommand {
        private final Long menuId;
        private final Integer quantity;
    }
}
