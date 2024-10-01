package com.darkopetrovic.transactionapp.repository;

import com.darkopetrovic.transactionapp.model.Notification;
import com.darkopetrovic.transactionapp.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser(User user, Sort sort);

    List<Notification> findByUserAndIsRead(User user, boolean isRead);
    Optional<Notification> findById(Long id);
}
