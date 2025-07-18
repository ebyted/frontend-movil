import axios from "axios";

export async function getStats(token: string) {
  return axios.get("/stats", { headers: { Authorization: `Bearer ${token}` } });
}
export async function getAchievements(token: string) {
  return axios.get("/achievements", { headers: { Authorization: `Bearer ${token}` } });
}
