import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/constants";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const POLLING_INTERVAL = 30000;

  const token = localStorage.getItem("jwtToken");

  const fetchNotifications = async () => {
    const response = await fetch(`${BASE_API_URL}/notifications`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    return await response.json();
  };

  const markAsRead = async () => {
    const response = await fetch(
      `${BASE_API_URL}/notifications/markAllAsRead`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: true }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to mark notification as read");
    }

    const data = await fetchNotifications();
    setNotifications(data);
  };

  const deleteAllNotifications = async () => {
    const response = await fetch(`${BASE_API_URL}/notifications/deleteAll`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete notifications");
    }

    const data = await fetchNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    getNotifications();
    const interval = setInterval(getNotifications, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const countUnreadNotifications = () =>
    notifications.filter((notification) => !notification.read).length;

  return {
    notifications,
    markAsRead,
    deleteAllNotifications,
    countUnreadNotifications,
    loading,
  };
};
