package com.nathanl25.crabgograb.lobby;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.nathanl25.crabgograb.message.ChatMessage;
import com.nathanl25.crabgograb.message.Message;
import com.nathanl25.crabgograb.message.MessageType;
import com.nathanl25.crabgograb.player.Player;

@ExtendWith(MockitoExtension.class)
public class LobbyControllerTest {

    @Mock
    private LobbyService lobbyService;

    private LobbyController lobbyController;

    @BeforeEach
    void setUp() {
        lobbyController = new LobbyController(lobbyService);
    }

    @Test
    void greeting_ShouldAddPlayerAndReturnJoinMessage() {
        // Arrange
        Player player = new Player("TestPlayer");

        // Act
        Message result = lobbyController.greeting(player);

        // Assert
        verify(lobbyService).addPlayer("TestPlayer");
        assertEquals("TestPlayer has joined", result.getContent());
        assertEquals(MessageType.ANNOUNCEMENT, result.getMessageType());
    }

    @Test
    void leaving_ShouldRemovePlayerAndReturnLeaveMessage() {
        // Arrange
        Player player = new Player("TestPlayer");

        // Act
        Message result = lobbyController.leaving(player);

        // Assert
        verify(lobbyService).removePlayer("TestPlayer");
        assertEquals("TestPlayer has disconnected", result.getContent());
        assertEquals(MessageType.ANNOUNCEMENT, result.getMessageType());
    }

    @Test
    void select_ShouldReturnSelectionMessage() {
        // Arrange
        ChatMessage chatMessage = new ChatMessage("TestPlayer", "3", MessageType.ANNOUNCEMENT);

        // Act
        Message result = lobbyController.select(chatMessage);

        // Assert
        assertEquals("TestPlayer has selected 3", result.getContent());
        assertEquals(MessageType.ANNOUNCEMENT, result.getMessageType());
    }

    @Test
    void rollDice_ShouldAnnounceRolldown() {
        // Arrange
        Player player = new Player("TestPlayer");

        // Act
        lobbyController.rollDice(player);

        // Assert
        verify(lobbyService).announceRolldown("TestPlayer");
    }

    @Test
    void chatMessage_ShouldReturnFormattedChatMessage() {
        // Arrange
        ChatMessage chatMessage = new ChatMessage("TestPlayer", "Hello!", MessageType.CHAT);

        // Act
        Message result = lobbyController.chatMessage(chatMessage);

        // Assert
        assertEquals("TestPlayer: Hello!", result.getContent());
        assertEquals(MessageType.CHAT, result.getMessageType());
    }
}