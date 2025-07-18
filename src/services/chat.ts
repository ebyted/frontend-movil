import axios from "axios";

export async function getChatMessages(token: string) {
  return axios.get("/chat", { headers: { Authorization: `Bearer ${token}` } });
}
export async function sendChatMessage(token: string, message: { text: string }) {
  return axios.post("/chat", message, { headers: { Authorization: `Bearer ${token}` } });
}
