package com.new_cafe.app.backend.order.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class Order {
    private final Long id;
    private final List<OrderItem> items;
    private final Integer totalPrice;
    private final OrderStatus status;
    private final LocalDateTime createdAt;

    public enum OrderStatus {
        PENDING, PROCESSING, COMPLETED, CANCELLED
    }

    @Getter
    @Builder
    public static class OrderItem {
        private final Long menuId;
        private final String menuName;
        private final Integer quantity;
        private final Integer price;
    }
}
