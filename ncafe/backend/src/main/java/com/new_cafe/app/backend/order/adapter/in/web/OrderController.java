package com.new_cafe.app.backend.order.adapter.in.web;

import com.new_cafe.app.backend.order.application.command.CreateOrderCommand;
import com.new_cafe.app.backend.order.application.port.in.PlaceOrderUseCase;
import com.new_cafe.app.backend.order.application.result.OrderResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final PlaceOrderUseCase placeOrderUseCase;

    @PostMapping
    public OrderResult placeOrder(@RequestBody CreateOrderRequest request) {
        CreateOrderCommand command = CreateOrderCommand.builder()
                .items(request.items().stream()
                        .map(item -> CreateOrderCommand.OrderItemCommand.builder()
                                .menuId(item.menuId())
                                .quantity(item.quantity())
                                .build())
                        .collect(Collectors.toList()))
                .build();

        return placeOrderUseCase.placeOrder(command);
    }

    public record CreateOrderRequest(java.util.List<OrderItemRequest> items) {}
    public record OrderItemRequest(Long menuId, Integer quantity) {}
}
