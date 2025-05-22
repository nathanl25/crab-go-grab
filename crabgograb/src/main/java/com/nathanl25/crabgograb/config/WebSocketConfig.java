package com.nathanl25.crabgograb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Server to client
        config.enableSimpleBroker("/game");
        // Client to server
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // String[] allowedOrigins = { "http://localhost:5173/",
        // "http://127.0.0.1:5173/" };
        // How the client connects to the websocket
        registry.addEndpoint("/crabgograb")
                // Allowed client domains
                .setAllowedOriginPatterns("*")
                // .setAllowedOriginPatterns("http://localhost:5173/")
                // Handles Transport Layer
                .withSockJS();
    }
}
