import axios from "axios";

export async function generateShareLink(token: string, type: string, id: string) {
  return axios.post("/share", { type, id }, { headers: { Authorization: `Bearer ${token}` } });
}
