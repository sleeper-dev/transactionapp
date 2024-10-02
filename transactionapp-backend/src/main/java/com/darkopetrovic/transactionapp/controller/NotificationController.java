package com.darkopetrovic.transactionapp.controller;

import com.darkopetrovic.transactionapp.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<?> getNotifications() {
        return ResponseEntity.ok(notificationService.getUserNotifications());
    }

    @PutMapping("/markAllAsRead")
    public ResponseEntity<?> markAllAsRead() {
        try {
            notificationService.markAllAsRead();
            return ResponseEntity.status(200).build();
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<?> deleteAllNotifications() {
        try {
            notificationService.deleteAllUserNotifications();
            return ResponseEntity.status(200).build();
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }
}
