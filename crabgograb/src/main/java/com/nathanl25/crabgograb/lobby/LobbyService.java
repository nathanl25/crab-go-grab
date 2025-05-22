package com.nathanl25.crabgograb.lobby;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.nathanl25.crabgograb.message.Message;
import com.nathanl25.crabgograb.message.MessageType;

@Service
public class LobbyService {

    private SimpMessagingTemplate msgTemplate;

    public LobbyService(SimpMessagingTemplate msgTemplate) {
        this.msgTemplate = msgTemplate;
    }

    public Message announceRolldown(String playerName) {
        Message announcement = new Message(playerName + " is rolling...", MessageType.ANNOUNCEMENT);
        msgTemplate.convertAndSend("/game/lobby", announcement);
        // System.out.println("Rolldown: " + announcement);
        String result = (int) (Math.random() * 6) + 1 + "";
        Message outcome = new Message(playerName + " rolled a " + result, MessageType.ANNOUNCEMENT);
        // String outcome = "" + result;
        msgTemplate.convertAndSend("/game/lobby", outcome);
        Message msg = new Message(result, MessageType.ANNOUNCEMENT);
        // msgTemplate.convertAndSend("/game/lobby", msg);
        return msg;
    }
}
