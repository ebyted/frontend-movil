import axios from "axios";

export async function getMediaList(token: string) {
  return axios.get("/media", { headers: { Authorization: `Bearer ${token}` } });
}
export async function getMediaResource(token: string, id: string) {
  return axios.get(`/media/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}
