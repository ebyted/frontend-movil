import axios from "axios";

export async function getGamificationProgress(token: string) {
  return axios.get("/gamification", { headers: { Authorization: `Bearer ${token}` } });
}
export async function updateGamificationProgress(token: string, progress: any) {
  return axios.put("/gamification", progress, { headers: { Authorization: `Bearer ${token}` } });
}
