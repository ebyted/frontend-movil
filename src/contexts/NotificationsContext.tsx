
import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";

type Notification = {
  id: string;
  title: string;
  body: string;
  date: string;
  // Puedes agregar más campos según tu modelo
};

type NotificationsContextType = {
  deviceToken: string;
  setDeviceToken: Dispatch<SetStateAction<string>>;
  registerDeviceToken: (token: string) => Promise<void>;
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  fetchNotifications: () => Promise<void>;
};

export const NotificationsContext = createContext<NotificationsContextType>({
  deviceToken: "",
  setDeviceToken: () => {},
  registerDeviceToken: async () => {},
  notifications: [],
  setNotifications: () => {},
  fetchNotifications: async () => {},
});


export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceToken, setDeviceToken] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Register device token with backend
  const registerDeviceToken = async (token: string) => {
    setDeviceToken(token);
    try {
      await axios.post("/profile/device-token", { token });
    } catch (error) {
      // Optionally handle error (e.g., show notification)
      console.error("Error registering device token:", error);
    }
  };

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      // Optionally handle error (e.g., show notification)
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications on mount
    fetchNotifications();
  }, []);

  return (
    <NotificationsContext.Provider value={{ deviceToken, setDeviceToken, registerDeviceToken, notifications, setNotifications, fetchNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
