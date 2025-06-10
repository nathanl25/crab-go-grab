package com.nathanl25.crabgograb.lobby;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.nathanl25.crabgograb.message.ChatMessage;
import com.nathanl25.crabgograb.message.Message;
import com.nathanl25.crabgograb.message.MessageType;
import com.nathanl25.crabgograb.player.Player;

@Controller
public class LobbyController {

    private LobbyService lobbyService;

    public LobbyController(LobbyService lobbyService) {
        this.lobbyService = lobbyService;
    }

    @MessageMapping("/greet")
    @SendTo("/game/lobby")
    public Message greeting(Player user) {
        String announcement = user.getName() + " has joined";
        System.out.println("Greeted");
        lobbyService.addPlayer(user.getName());
        return new Message(announcement, MessageType.ANNOUNCEMENT);
    }

    @MessageMapping("/leave")
    @SendTo("/game/lobby")
    public Message leaving(Player user) {
        String announcement = user.getName() + " has disconnected";
        System.out.println("Greeted");
        lobbyService.removePlayer(user.getName());
        return new Message(announcement, MessageType.ANNOUNCEMENT);
    }

    @MessageMapping("/select")
    @SendTo("/game/lobby")
    public Message select(ChatMessage message) {
        String announcement = message.getName() + " has selected " + message.getContent();
        // System.out.println("Greeted");
        return new Message(announcement, MessageType.ANNOUNCEMENT);
    }

    @MessageMapping("/roll")
    // @SendTo("/game/outcome")
    public void rollDice(Player user) {
        lobbyService.announceRolldown(user.getName());
        // String announcement = user.getName() + " is rolling";
        // return new Message(announcement, MessageType.ANNOUNCEMENT);
    }

    @MessageMapping("/chat")
    @SendTo("/game/lobby")
    public Message chatMessage(ChatMessage message) {
        String msg = message.getName() + ": " + message.getContent();
        return new Message(msg, MessageType.CHAT);
    }
    // @MessageMapping
}
