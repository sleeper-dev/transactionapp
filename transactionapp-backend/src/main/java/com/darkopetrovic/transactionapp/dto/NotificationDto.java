package com.darkopetrovic.transactionapp.dto;

import java.time.LocalDateTime;

public class NotificationDto {

    private final Long id;
    private final String message;
    private final boolean isRead;
    private final LocalDateTime dateCreated;

    public NotificationDto(Long id, String message, boolean isRead, LocalDateTime dateCreated) {
        this.id = id;
        this.message = message;
        this.isRead = isRead;
        this.dateCreated = dateCreated;
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public boolean isRead() {
        return isRead;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }
}
