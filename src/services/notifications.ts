import axios from "axios";

export async function registerDeviceToken(token: string, deviceToken: string) {
  return axios.post("/notifications/register", { deviceToken }, { headers: { Authorization: `Bearer ${token}` } });
}
export async function getNotifications(token: string) {
  return axios.get("/notifications", { headers: { Authorization: `Bearer ${token}` } });
}
