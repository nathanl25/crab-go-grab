package com.nathanl25.crabgograb.lobby;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.nathanl25.crabgograb.message.Message;

import java.util.List;
import org.awaitility.Awaitility;
import java.util.concurrent.TimeUnit;

@ExtendWith(MockitoExtension.class)
public class LobbyServiceTest {

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    private LobbyService lobbyService;

    @BeforeEach
    void setUp() {
        lobbyService = new LobbyService(messagingTemplate);
    }

    @Test
    void addPlayer_ShouldAddPlayerToListAndBroadcastUpdate() {
        // Act
        lobbyService.addPlayer("TestPlayer");

        // Assert
        List<String> players = lobbyService.getPlayers();
        assertTrue(players.contains("TestPlayer"));
        verify(messagingTemplate).convertAndSend("/game/playerlist", players);
    }

    @Test
    void removePlayer_ShouldRemovePlayerAndBroadcastUpdate() {
        // Arrange
        lobbyService.addPlayer("TestPlayer");

        // Act
        lobbyService.removePlayer("TestPlayer");

        // Assert
        List<String> players = lobbyService.getPlayers();
        assertFalse(players.contains("TestPlayer"));
        verify(messagingTemplate, times(2))
                .convertAndSend("/game/playerlist", players);
    }

    @Test
    void announceRolldown_ShouldBroadcastRollStatusAndOutcome() {
        // Arrange
        ArgumentCaptor<Message> statusCaptor = ArgumentCaptor.forClass(Message.class);
        ArgumentCaptor<Message> outcomeCaptor = ArgumentCaptor.forClass(Message.class);

        // Act
        lobbyService.announceRolldown("TestPlayer");

        // Assert initial ROLL_IN_PROGRESS status
        verify(messagingTemplate)
                .convertAndSend(eq("/game/roll/status"), statusCaptor.capture());
        assertEquals("ROLL_IN_PROGRESS", statusCaptor.getValue().getContent());

        // Wait for and verify countdown and ROLL_COMPLETE
        Awaitility.await()
                .atMost(4, TimeUnit.SECONDS)
                .untilAsserted(() -> {
                    verify(messagingTemplate, times(2)) // 3, 2, 1, COMPLETE
                            .convertAndSend(eq("/game/roll/status"), statusCaptor.capture());
                    List<Message> statusMessages = statusCaptor.getAllValues();
                    assertEquals("ROLL_IN_PROGRESS", statusMessages.get(1).getContent());
                    assertEquals("ROLL_COMPLETE", statusMessages.get(2).getContent());
                    // assertEquals("ROLL_COMPLETE", statusMessages.get(3).getContent());
                });

        // Verify outcome
        verify(messagingTemplate)
                .convertAndSend(eq("/game/roll/outcome"), outcomeCaptor.capture());
        assertNotNull(outcomeCaptor.getValue().getContent());
        assertTrue(outcomeCaptor.getValue().getContent().matches("[1-6]"));
    }

    @Test
    void getPlayers_ShouldReturnCurrentPlayerList() {
        // Arrange
        lobbyService.addPlayer("Player1");
        lobbyService.addPlayer("Player2");

        // Act
        List<String> players = lobbyService.getPlayers();

        // Assert
        assertEquals(2, players.size());
        assertTrue(players.contains("Player1"));
        assertTrue(players.contains("Player2"));
    }
}