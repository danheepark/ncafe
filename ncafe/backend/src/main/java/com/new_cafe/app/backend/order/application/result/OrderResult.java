package com.new_cafe.app.backend.order.application.result;

/**
 * [Result] 주문 결과
 */
public record OrderResult(
        Long orderId,
        String status,
        Integer totalPrice
) {
}
