import axios from "axios";

export async function getDiarioEntries(token: string) {
  return axios.get("/diario", { headers: { Authorization: `Bearer ${token}` } });
}
export async function createDiarioEntry(token: string, entry: { text: string }) {
  return axios.post("/diario", entry, { headers: { Authorization: `Bearer ${token}` } });
}
export async function updateDiarioEntry(token: string, id: string, entry: { text: string }) {
  return axios.put(`/diario/${id}`, entry, { headers: { Authorization: `Bearer ${token}` } });
}
export async function deleteDiarioEntry(token: string, id: string) {
  return axios.delete(`/diario/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}
