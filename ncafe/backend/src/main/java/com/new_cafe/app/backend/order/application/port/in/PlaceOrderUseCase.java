package com.new_cafe.app.backend.order.application.port.in;

import com.new_cafe.app.backend.order.application.command.CreateOrderCommand;
import com.new_cafe.app.backend.order.application.result.OrderResult;

/**
 * [Input Port] 주문하기 유스케이스
 */
public interface PlaceOrderUseCase {
    OrderResult placeOrder(CreateOrderCommand command);
}
