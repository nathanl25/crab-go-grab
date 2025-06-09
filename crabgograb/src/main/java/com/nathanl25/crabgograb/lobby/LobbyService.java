package com.nathanl25.crabgograb.lobby;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.nathanl25.crabgograb.message.Message;
import com.nathanl25.crabgograb.message.MessageType;
import jakarta.annotation.PreDestroy;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class LobbyService {
    private final SimpMessagingTemplate msgTemplate;
    private final AtomicBoolean isCountdownActive = new AtomicBoolean(false);
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private final ReentrantLock countdownLock = new ReentrantLock();
    private ScheduledFuture<?> currentCountdown;

    public LobbyService(SimpMessagingTemplate msgTemplate) {
        this.msgTemplate = msgTemplate;
    }

    public void announceRolldown(String playerName) {
        countdownLock.lock();
        try {
            if (isCountdownActive.get()) {
                msgTemplate.convertAndSend("/game/roll/status",
                        new Message("Roll in progress, please wait", MessageType.ANNOUNCEMENT));
                return;
            }

            isCountdownActive.set(true);

            // Send roll status
            msgTemplate.convertAndSend("/game/roll/status",
                    new Message("ROLL_IN_PROGRESS", MessageType.ROLL_STATUS));

            // Initial announcement
            msgTemplate.convertAndSend("/game/lobby",
                    new Message(playerName + " is rolling, locking bets in 3 seconds", MessageType.ANNOUNCEMENT));

            // Start countdown
            AtomicInteger count = new AtomicInteger(3);
            currentCountdown = scheduler.scheduleAtFixedRate(() -> {
                try {
                    int currentCount = count.getAndDecrement();
                    if (currentCount > 0) {
                        msgTemplate.convertAndSend("/game/lobby",
                                new Message(String.valueOf(currentCount) + "...", MessageType.COUNTDOWN));
                    }

                    if (currentCount <= 0) {
                        stopCountdown();
                        // Generate and send roll result
                        String result = String.valueOf((int) (Math.random() * 6) + 1);
                        Message outcome = new Message(playerName + " rolled a " + result, MessageType.ANNOUNCEMENT);
                        msgTemplate.convertAndSend("/game/lobby", outcome);
                        msgTemplate.convertAndSend("/game/roll/outcome",
                                new Message(result, MessageType.ROLL));
                        // Send roll complete status
                        msgTemplate.convertAndSend("/game/roll/status",
                                new Message("ROLL_COMPLETE", MessageType.ROLL_STATUS));
                    }
                } catch (Exception e) {
                    stopCountdown();
                }
            }, 0, 1, TimeUnit.SECONDS);
        } finally {
            countdownLock.unlock();
        }
    }

    private void stopCountdown() {
        countdownLock.lock();
        try {
            if (currentCountdown != null) {
                currentCountdown.cancel(false);
                currentCountdown = null;
            }
            isCountdownActive.set(false);
        } finally {
            countdownLock.unlock();
        }
    }

    @PreDestroy
    public void shutdown() {
        scheduler.shutdown();
        try {
            if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                scheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}
