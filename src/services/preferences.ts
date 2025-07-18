import axios from "axios";

export async function getPreferences(token: string) {
  return axios.get("/preferences", { headers: { Authorization: `Bearer ${token}` } });
}
export async function updatePreferences(token: string, prefs: any) {
  return axios.put("/preferences", prefs, { headers: { Authorization: `Bearer ${token}` } });
}
