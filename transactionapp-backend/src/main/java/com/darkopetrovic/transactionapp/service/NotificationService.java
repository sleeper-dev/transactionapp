package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.dto.NotificationDto;
import com.darkopetrovic.transactionapp.exception.NotFoundException;
import com.darkopetrovic.transactionapp.model.Notification;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.repository.NotificationRepository;
import com.darkopetrovic.transactionapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public Notification createNotification(String message, User user) {
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setUser(user);
        return notificationRepository.save(notification);
    }

    public List<NotificationDto> getUserNotifications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
        Sort sort = Sort.by(Sort.Direction.DESC, "dateCreated");
        List<Notification> notifications = notificationRepository.findByUser(user, sort);

        return notifications.stream().map(notification -> new NotificationDto(
                notification.getId(),
                notification.getMessage(),
                notification.isRead(),
                notification.getDateCreated())).collect(Collectors.toList());

    }

    public void markAllAsRead() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Notification> notifications = notificationRepository.findByUserAndIsRead(user, false);
        for (Notification notification : notifications) {
            notification.setRead(true);
        }
        notificationRepository.saveAll(notifications);
    }

    public void deleteAllUserNotifications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        notificationRepository.deleteByUser(user);
    }
}
