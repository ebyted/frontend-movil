import axios from "axios";

export async function getRitualProgress(token: string) {
  return axios.get("/ritual", { headers: { Authorization: `Bearer ${token}` } });
}
export async function updateRitualProgress(token: string, progress: string[]) {
  return axios.put("/ritual", { progress }, { headers: { Authorization: `Bearer ${token}` } });
}
