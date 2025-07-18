
import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";

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

  // Placeholder: register device token with backend when endpoint is ready
  const registerDeviceToken = async (token: string) => {
    setDeviceToken(token);
    // TODO: Replace with POST /profile/device-token when backend is ready
    // await axios.post("/profile/device-token", { token });
  };

  // Placeholder: fetch notifications from backend when endpoint is ready
  const fetchNotifications = async () => {
    // TODO: Replace with GET /notifications when backend is ready
    // const res = await axios.get("/notifications");
    // setNotifications(res.data);
  };

  useEffect(() => {
    // Example: fetch notifications on mount (when endpoint is ready)
    // fetchNotifications();
  }, []);

  return (
    <NotificationsContext.Provider value={{ deviceToken, setDeviceToken, registerDeviceToken, notifications, setNotifications, fetchNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
